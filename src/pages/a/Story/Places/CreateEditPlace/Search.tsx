import TextField from '@mui/material/TextField'
import React, { useMemo, useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import debounce from 'lodash/debounce'
import api from '../../../../../lib/api'
import { LocationSearchType } from '../../../../../lib/types'

interface iPersonSearch {
  handleSelect: (place: LocationSearchType | null) => void
  initialValue?: string
}

const Search: React.FC<iPersonSearch> = ({ handleSelect, initialValue }) => {
  const [options, setOptions] = useState<readonly LocationSearchType[]>([])
  const [value, setValue] = useState<LocationSearchType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    handleSelect(value)
  }, [value])

  const fetch = useMemo(
    () =>
      debounce(async (q: string, callback: (results: readonly LocationSearchType[]) => void) => {
        const results = await api.searchLocation(q)
        callback(results)
        setLoading(false)
      }, 1000),
    []
  )

  useEffect(() => {
    if (initialValue) {
      fetch(initialValue, (results?: readonly LocationSearchType[]) => {
        setOptions([...results!])
        setValue(results![0])
        setInputValue(results![0].display_name)
      })
    }
  }, [initialValue])

  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return
    }

    setLoading(true)

    fetch(inputValue, (results?: readonly LocationSearchType[]) => {
      if (active) {
        let newOptions: readonly LocationSearchType[] = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })
    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      filterOptions={x => x}
      onChange={(event: any, newValue: LocationSearchType | null) => {
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
      }}
      autoComplete
      includeInputInList
      filterSelectedOptions
      options={options}
      fullWidth
      getOptionLabel={option => option.display_name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.osmId}>
            {option.display_name}
          </li>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Search a place for add"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )}
              </>
            )
          }}
        />
      )}
    />
  )
}

export default Search
