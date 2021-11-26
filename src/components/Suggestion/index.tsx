import React, { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import api from '../../lib/api'
import debounce from 'lodash/debounce'
import { useHistory } from 'react-router-dom'

const Suggestion = () => {
  const [options, setOptions] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const history = useHistory()

  const suggestionsHandler = useCallback(
    debounce(async (query: string) => {
      setLoading(true)
      const { suggestions } = await api.searchSuggestions(query)
      setOptions(suggestions)
      setLoading(false)
    }, 1500),
    []
  )

  useEffect(() => {
    suggestionsHandler(searchValue)
  }, [searchValue])

  return (
    <Box minWidth="415px">
      <Autocomplete
        freeSolo
        loading={loading}
        disableClearable
        options={options}
        onChange={(event, value: string) => {
          history.push({ pathname: '/a/search', search: `q=${value}` })
        }}
        onInputChange={(event, value) => setSearchValue(value)}
        onKeyPress={event => {
          if (event.key === 'Enter') history.push({ pathname: '/a/search', search: `q=${searchValue}` })
        }}
        fullWidth
        value={searchValue}
        renderInput={params => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        )}
      />
    </Box>
  )
}

export default Suggestion
