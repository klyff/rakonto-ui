import React, { useContext, useState } from 'react'
import { PlaceType } from '../../../../lib/types'
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

  const handleSelect = async (place: PlaceType) => {
    setPlaces([...places, place])
  }

  const handleDelete = async (place: PlaceType) => {
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
            await api.removePersonFromStory(storyId, place.id)
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
        places
          .filter(p => p.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
          .map(place => <div key={place.id}>{place.name}</div>)
      ) : (
        <Typography align="center">No place register yet</Typography>
      )}
    </Box>
  )
}

export default Places
