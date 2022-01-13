import { PlaceType } from '../../../../../lib/types'
import TextField from '@mui/material/TextField'
import React, { useEffect, useMemo, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import debounce from 'lodash/debounce'
import api from '../../../../../lib/api'

type PlaceTypeOption = PlaceType & {
  label: string
}

const filter = createFilterOptions<PlaceTypeOption>()

interface iPlaceSearch {
  handleSelect: (place: PlaceType) => void
  handleOpen: (value: boolean, place?: PlaceType) => void
  places: PlaceType[]
}

const PlaceSearch: React.FC<iPlaceSearch> = ({ handleSelect, handleOpen, places }) => {
  const [options, setOptions] = useState<readonly PlaceTypeOption[]>([])
  const [value, setValue] = useState<PlaceTypeOption | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    if (!value) return
    if (value?.id === 'new place') {
      handleOpen(true, value)
      setInputValue('')
      setValue(null)
      return
    }
    handleSelect(value)
    setInputValue('')
    setValue(null)
  }, [value])

  const fetch = useMemo(
    () =>
      debounce(async (q: string, callback: (results: readonly PlaceType[]) => void) => {
        const results = await api.getPlaces(0, 10000, q)
        callback(results.content.filter(p => !places.some(i => i.id === p.id)))
        setLoading(false)
      }, 1000),
    []
  )

  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return
    }

    setLoading(true)

    fetch(inputValue, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceTypeOption[] = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results.map(p => ({ ...p, label: p.name }))]
        }

        setOptions(newOptions)
      }
    })
    return () => {
      active = false
    }
  }, [inputValue, fetch])

  return (
    <Autocomplete
      inputValue={inputValue}
      value={value || undefined}
      size="small"
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      loading={loading}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        // Suggest the creation of a new value
        const isExisting = options.some(option => inputValue === option.name)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            id: 'new place',
            name: inputValue,
            label: `Click here to add "${inputValue}" as a new place in Rakonto.`
          })
        }

        return filtered
      }}
      options={options}
      fullWidth
      autoComplete
      includeInputInList
      filterSelectedOptions
      disableClearable
      getOptionLabel={option => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Type the name of the place you wish to add"
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

export default PlaceSearch
