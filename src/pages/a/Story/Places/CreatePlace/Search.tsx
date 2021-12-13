import TextField from '@mui/material/TextField'
import React, { useCallback, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import debounce from 'lodash/debounce'
import api from '../../../../../lib/api'
import { LocationSearchType } from '../../../../../lib/types'

interface iPersonSearch {
  handleSelect: (place: LocationSearchType) => void
}

const Search: React.FC<iPersonSearch> = ({ handleSelect }) => {
  const [options, setOptions] = useState<LocationSearchType[]>([])
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const searchHandler = useCallback(
    debounce(async (q: string) => {
      setLoading(true)
      const result = await api.searchLocation(q)
      setOptions(result)
      setLoading(false)
    }, 1500),
    []
  )

  useEffect(() => {
    searchHandler(value)
  }, [value])

  return (
    <Autocomplete
      inputValue={value}
      freeSolo
      loading={loading}
      onChange={(event, newValue) => {
        handleSelect(newValue as LocationSearchType)
      }}
      options={options}
      fullWidth
      clearOnBlur={true}
      selectOnFocus
      handleHomeEndKeys
      getOptionLabel={option => option.display_name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.osmId}>
            {option.display_name}
          </li>
        )
      }}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue)
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Search a person for add"
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
  )
}

export default Search
