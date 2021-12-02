import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles, createStyles } from '@mui/styles'
import { IconButton } from '@mui/material'
import { Fragment, useMemo, useState, useEffect } from 'react'
import throttle from 'lodash/throttle'
import api from '../../lib/api'

const useStyles = makeStyles(() =>
  createStyles({
    textFieldRoot: {
      "& > div.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
        paddingRight: '9px',

        '& button': {
          order: 3
        },

        '& > div.MuiAutocomplete-endAdornment': {
          position: 'relative',
          order: 2
        }
      }
    }
  })
)

interface iSearchBox {
  onSearch: (value: string) => void
  q?: string
}

const SearchBox: React.FC<iSearchBox> = ({ onSearch, q }) => {
  const classes = useStyles()

  const [value, setValue] = useState<string | null>(q || null)
  const [inputValue, setInputValue] = useState(q || '')
  const [options, setOptions] = useState<readonly string[]>([])

  const fetchOptions = useMemo(
    () =>
      throttle(async (query: string) => {
        const { suggestions } = await api.searchSuggestions(query)
        setOptions(suggestions)
      }, 200),
    []
  )

  useEffect(() => {
    if (inputValue.trim().length > 3) {
      fetchOptions(inputValue)
    } else {
      setOptions([])
    }
  }, [inputValue, fetch])

  return (
    <Box>
      <Autocomplete
        freeSolo
        filterOptions={x => x}
        options={options}
        filterSelectedOptions
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          onSearch(newValue || '')
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        sx={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            classes={{
              root: classes.textFieldRoot
            }}
            label="Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                  {params.InputProps.endAdornment}
                </Fragment>
              )
            }}
          />
        )}
      />
    </Box>
  )
}

export default SearchBox
