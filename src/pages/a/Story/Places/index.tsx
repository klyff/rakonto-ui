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
import Button from '@mui/material/Button'
import CreateEditPlace from './CreatePlace'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import MapViewer from '../../../../components/MapViewer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

interface iPlace {
  intialPlaces: PlaceType[]
  canEdit: boolean
  storyId: string
}

const Places: React.FC<iPlace> = ({ intialPlaces, canEdit, storyId }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [places, setPlaces] = useState<PlaceType[]>(intialPlaces)
  const [markers, setMarkers] = useState<markerType[]>([])
  const [openMarker, setOpenMarker] = useState<string | undefined>(undefined)

  const handleSelect = async (place: PlaceType) => {
    setPlaces([...places, place])
  }

  useEffect(() => {
    setMarkers(
      places
        .filter(p => p.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
        .map(place => ({
          id: place.id,
          title: place.name,
          description: place.description,
          marker: [Number(place.latitude), Number(place.longitude)]
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
            await api.deletePlace(place.id)
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

        setPlaces(places.filter(p => p.id !== place.id))
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
  console.log(openMarker)
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
      {canEdit && (
        <>
          {isOpen && <CreateEditPlace storyId={storyId} onClose={handleCloseDialog} />}
          <Box>
            <Button variant="outlined" onClick={() => setIsOpen(true)} sx={{ mt: 1, mr: 1 }}>
              Add place
            </Button>
          </Box>
        </>
      )}

      <Divider sx={{ margin: '24px 0' }} />
      {!canEdit && (
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
          {canEdit && (
            <Box sx={{ top: 10, left: 10, width: '250px', height: '100%' }}>
              <List>
                {markers.map(m => (
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={() => handleDelete(places.find(p => p.id === m.id))}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    selected={m.id === openMarker}
                    onMouseEnter={() => setOpenMarker(m.id)}
                    onMouseLeave={() => setOpenMarker(undefined)}
                    key={m.id}
                  >
                    <ListItemText>{m.title}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          <Box sx={{ top: 10, left: 10, flex: 1, height: '100%' }}>
            <MapViewer openMarker={openMarker} markers={markers} />
          </Box>
        </Box>
      ) : (
        <Typography align="center">No place register yet</Typography>
      )}
    </Box>
  )
}

export default Places
