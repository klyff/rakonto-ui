import { PersonType } from '../../../../../lib/types'
import TextField from '@mui/material/TextField'
import React, { useCallback, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import debounce from 'lodash/debounce'
import api from '../../../../../lib/api'

type PersonOptionType = Partial<PersonType> & {
  inputValue?: string
}
const filter = createFilterOptions<PersonOptionType>()

interface iPersonSearch {
  handleSelect: (person: PersonType) => void
  handleOpen: (value: boolean) => void
  people: PersonType[]
}

const PersonSearch: React.FC<iPersonSearch> = ({ handleSelect, handleOpen, people }) => {
  const [options, setOptions] = useState<PersonOptionType[]>([])
  const [value, setValue] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const searchHandler = useCallback(
    debounce(async () => {
      setLoading(true)
      const { content } = await api.getPersons(0, 10000)
      setOptions(content)
      setLoading(false)
    }, 1500),
    []
  )

  useEffect(() => {
    searchHandler()
  }, [])

  return (
    <Autocomplete
      inputValue={value}
      size="small"
      freeSolo
      loading={loading}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          return null
        } else if (newValue && newValue.inputValue) {
          handleOpen(true)
        } else {
          handleSelect(newValue as PersonType)
        }
        setValue(undefined)
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params).filter(p => !people.some(i => i.id === p.id))

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Click here to add "${params.inputValue}" as a new person in Rakonto.`
          })
        }

        return filtered
      }}
      options={options}
      fullWidth
      clearOnBlur={true}
      selectOnFocus
      handleHomeEndKeys
      getOptionLabel={option => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return option
        }
        if (option.inputValue) {
          return option.inputValue
        }
        return option.name as string
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name}
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
