import { PersonType } from '../../../../../lib/types'
import TextField from '@mui/material/TextField'
import React, { useEffect, useMemo, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import debounce from 'lodash/debounce'
import api from '../../../../../lib/api'

type PersonTypeOption = PersonType & {
  label: string
}

const filter = createFilterOptions<PersonTypeOption>()

interface iPersonSearch {
  handleSelect: (person: PersonType) => void
  handleOpen: (value: boolean, person?: PersonType) => void
  people: PersonType[]
}

const PersonSearch: React.FC<iPersonSearch> = ({ handleSelect, handleOpen, people }) => {
  const [options, setOptions] = useState<readonly PersonTypeOption[]>([])
  const [value, setValue] = useState<PersonTypeOption | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    if (!value) return
    if (value?.id === 'new person') {
      handleOpen(true, value)
      setValue(null)
      setInputValue('')
      return
    }
    handleSelect(value)
    setValue(null)
    setInputValue('')
  }, [value])

  const fetch = useMemo(
    () =>
      debounce(async (q: string, callback: (results: readonly PersonType[]) => void) => {
        const results = await api.getPersons(0, 10000, q)
        callback(results.content.filter(p => !people.some(i => i.id === p.id)))
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

    fetch(inputValue, (results?: readonly PersonType[]) => {
      if (active) {
        let newOptions: readonly PersonTypeOption[] = []

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
  }, [value, inputValue, fetch])

  return (
    <Autocomplete
      inputValue={inputValue}
      value={value}
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
            id: 'new person',
            name: inputValue,
            label: `Click here to add "${inputValue}" as a new person in Rakonto.`,
            link: '',
            picture: null
          })
        }

        return filtered
      }}
      options={options}
      fullWidth
      autoComplete
      includeInputInList
      filterSelectedOptions
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
          placeholder="Type the name of the person you wish to add"
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

export default PersonSearch
