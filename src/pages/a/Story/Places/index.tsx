import React, { useContext, useEffect, useState } from 'react'
import { markerType, PlaceType } from '../../../../lib/types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'
import CreateEditPlace from './CreateEditPlace'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import MapViewer from '../../../../components/MapViewer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import PlaceSearch from './PlaceSearch'
import { LatLngExpression } from 'leaflet'

interface iPlace {
  isEditor: boolean
  isOwner: boolean
  storyId: string
}

const Places: React.FC<iPlace> = ({ isOwner, isEditor, storyId }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [markers, setMarkers] = useState<markerType[]>([])
  const [openMarker, setOpenMarker] = useState<string | undefined>(undefined)
  const [position, setPosition] = useState<LatLngExpression | undefined>(undefined)
  const [placeSelectedEdit, setPlaceSelectedEdit] = useState<PlaceType | undefined>()

  const fetch = async () => {
    const result = await api.getPlaces(0, 1000, '', [storyId])
    setPlaces(result.content)
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleSelect = async (place: PlaceType) => {
    if (place?.id) {
      try {
        await api.addPlaceToStory(storyId, place.id)
        snackActions.open(`${place.name} added to this story!`)
      } catch (error) {
        // @ts-ignore
        const { data } = error
        if (data.code) {
          snackActions.open(`Error to add ${place.name} to this story!`)
          return
        }
        snackActions.open('Something was wrong! please try again.')
      }

      fetch()
    }
  }

  const handleOpen = (value: boolean, place?: PlaceType) => {
    setPlaceSelectedEdit(value ? place : undefined)
    setIsOpen(value)
  }

  useEffect(() => {
    setMarkers(
      places
        .filter(p => p.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
        .map<markerType>(place => ({
          id: place.id,
          title: place.name,
          content: (
            <>
              <strong>{place.name}</strong>
              <br />
              {place.description}
            </>
          ),
          marker: [Number(place.latitude), Number(place.longitude)],
          place: place
        }))
    )
  }, [places, searchValue])

  const handleDelete = async (place?: PlaceType) => {
    if (!place) {
      snackActions.open('Something was wrong! please try again.')
      return
    }
    simpleDialogActions.open(
      'Delete place',
      <>
        <Typography>Are you sure want to delete</Typography>
        <Typography fontWeight="700" component="span">{` ${place.name} `}</Typography>
        <Typography component="span">from this story?</Typography>
      </>,
      { okText: 'Yes, delete', showOk: true, cancelText: 'Back' },
      async success => {
        try {
          if (success) {
            await api.removePlaceFromStory(storyId, place.id)
            setPlaces(places.filter(p => p.id !== place.id))
            snackActions.open(`${place.name} removed from this story!`)
          }
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code) {
            snackActions.open(`Error to add ${place.name} to this story!`)
            return
          }
          snackActions.open('Something was wrong! please try again.')
        }
      }
    )
  }

  const handleCloseDialog = (place?: PlaceType) => {
    if (place) {
      if (places.some(p => p.id === place.id)) {
        setPlaces(
          places.map(p => {
            if (p.id === place.id) return place
            return p
          })
        )
      } else {
        handleSelect(place)
      }
    }
    setIsOpen(false)
  }

  return (
    <Box
      component={Paper}
      sx={{
        width: '100%',
        display: 'flex',
        padding: 3,
        flexFlow: 'column'
      }}
    >
      {(isOwner || isEditor) && (
        <>
          {isOpen && <CreateEditPlace onClose={handleCloseDialog} selectedPlace={placeSelectedEdit} />}
          <Typography sx={{ marginBottom: 3 }} gutterBottom>
            Add places that are mentioned in the story. Users will be able to filter / search for stories mentioning
            specific places and view them on a map.
          </Typography>
          <Box
            sx={{
              maxWidth: '422px'
            }}
          >
            <PlaceSearch handleOpen={handleOpen} handleSelect={handleSelect} places={places} allowAdd={isOwner} />
          </Box>
        </>
      )}

      <Divider sx={{ margin: '24px 0' }} />
      {!isOwner && !isEditor && (
        <Box
          sx={{
            maxWidth: '422px',
            marginBottom: 3
          }}
        >
          <TextField
            size="small"
            key="search"
            name="search"
            fullWidth
            rows={4}
            autoComplete="off"
            placeholder="Type place name for filter list"
            margin="dense"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
      )}

      {places.length ? (
        <Box sx={{ width: '100%', height: '500px', display: 'flex' }}>
          <Box
            sx={{
              top: 10,
              left: 10,
              width: '422px',
              height: '100%',
              bgcolor: 'background.default',
              overflow: 'auto',
              marginRight: 4
            }}
          >
            <List>
              {markers.map(m => (
                <ListItem
                  onMouseEnter={() => {
                    setOpenMarker(m.id)
                    setPosition(m.marker)
                  }}
                  onMouseLeave={() => setOpenMarker(undefined)}
                  secondaryAction={
                    isOwner && (
                      <>
                        <IconButton
                          onClick={() => {
                            handleOpen(true, m.place)
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(places.find(p => p.id === m.id))}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )
                  }
                  key={m.id}
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={() => {
                      setOpenMarker(m.id)
                      setPosition(m.marker)
                    }}
                  >
                    <ListItemText>{m.title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ top: 10, left: 10, flex: 1, height: '100%' }}>
            <MapViewer initialZoom={position ? 12 : 0} position={position} openMarker={openMarker} markers={markers} />
          </Box>
        </Box>
      ) : (
        <Typography align="center">No place register yet</Typography>
      )}
    </Box>
  )
}

export default Places
