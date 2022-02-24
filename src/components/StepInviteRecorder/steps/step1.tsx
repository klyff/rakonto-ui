import React, { useCallback, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { SearchResultType } from '../../../lib/types'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import debounce from 'lodash/debounce'
import api from '../../../lib/api'
import { useField } from 'formik'

const Step1 = () => {
  const [options, setOptions] = useState<SearchResultType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [
    { value: collectionValue, onBlur: collectionOnBlur },
    { touched: collectionTouched, error: collectionError },
    { setValue }
  ] = useField('collection')

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
    searchHandler(searchValue)
  }, [searchValue])

  const handleSelected = (value: SearchResultType) => {
    setValue(value)
  }

  return (
    <>
      <Typography mb={2}>
        With Rakonto, you can ask other people to record short stories and save them in your library. It&apos;s a great
        way to quickly capture cherished memories, vignettes, feedback, learnings and so much more!
      </Typography>
      <Typography mb={2}>First, where would you like to save these recordings?</Typography>
      <Box>
        <Autocomplete
          size="small"
          value={collectionValue}
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
              autoFocus
              placeholder="Type and select a collection title"
              onBlur={collectionOnBlur}
              name="collection"
              error={collectionTouched && Boolean(collectionError)}
              helperText={(collectionTouched && collectionError) || ' '}
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
      </Box>
    </>
  )
}

export default Step1
