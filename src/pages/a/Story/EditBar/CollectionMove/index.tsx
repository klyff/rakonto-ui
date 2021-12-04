import React, { useState, useEffect, useCallback, useContext } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import api from '../../../../../lib/api'
import debounce from 'lodash/debounce'
import { SearchResultType } from '../../../../../lib/types'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import Typography from '@mui/material/Typography'
import { SimpleSnackbarContext } from '../../../../../components/SimpleSnackbar'

interface iCollectionMove {
  storyId: string
  currentCollectionId: string
  reload: () => void
}

const CollectionMove: React.FC<iCollectionMove> = ({ storyId, reload, currentCollectionId }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<SearchResultType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedCollection, setSelectedCollection] = useState<SearchResultType | null>(null)

  const searchHandler = useCallback(
    debounce(async (query: string) => {
      setLoading(true)
      const { content } = await api.searchCollections(0, 100, query)
      setOptions(content)
      setLoading(false)
    }, 1500),
    []
  )

  useEffect(() => {
    if (open) {
      setSearchValue('')
      setSelectedCollection(null)
    }
  }, [open])

  useEffect(() => {
    searchHandler(searchValue)
  }, [searchValue])

  const handleSelected = (value: SearchResultType) => {
    setSelectedCollection(value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMove = async () => {
    try {
      if (selectedCollection?.entity.id) {
        await api.changeStoryToCollection(storyId, selectedCollection.entity.id, currentCollectionId)
        reload()
        snackActions.open('This story was moved to new collection!')
        handleClose()
      }
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code) {
        snackActions.open('This story cannot be moved!')
        throw error
      }
      snackActions.open('Something was wrong! please try again.')
      throw error
    }
  }

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)} startIcon={<SwapHorizIcon />}>
        Change collection
      </Button>
      <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
        <DialogTitle>Move to collection</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Typography variant="body2" fontWeight="700" marginBottom={3} gutterBottom>
              Select a target collection to move this story!
            </Typography>
            <Autocomplete
              size="small"
              loading={loading}
              disableClearable
              options={options}
              isOptionEqualToValue={({ entity }, value) => entity.title === value.entity.title}
              getOptionLabel={({ entity }) => entity.title}
              onInputChange={(event, value) => setSearchValue(value)}
              fullWidth
              onChange={(event, value: SearchResultType) => handleSelected(value)}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.entity.id}>
                    {option.entity.title}
                  </li>
                )
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder="Type the collection title"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        )}
                      </React.Fragment>
                    )
                  }}
                />
              )}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleMove}>
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CollectionMove
