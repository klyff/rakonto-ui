import { CollectionType, SearchResultType } from '../../lib/types'
import TextField from '@mui/material/TextField'
import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import debounce from 'lodash/debounce'
import api from '../../lib/api'
import { InputBaseProps } from '@mui/material/InputBase'
import { CreateCollectionContext } from '../CreateCollection'

type CollectionTypeOption = Partial<SearchResultType> & {
  label: string
}

const filter = createFilterOptions<CollectionTypeOption>()

interface iCollectionSearch {
  handleSelect: (collection: CollectionType | null) => void
  allowAdd: boolean
  onBlur?: InputBaseProps['onBlur']
  error?: boolean
  helperText: string
  name?: string
}

const CollectionSearch: React.FC<iCollectionSearch> = ({
  handleSelect,
  allowAdd = false,
  onBlur,
  name,
  helperText = ' ',
  error
}) => {
  const { actions: createCollectionActions } = useContext(CreateCollectionContext)
  const [optionsState, setOptions] = useState<readonly CollectionTypeOption[]>([])
  const [value, setValue] = useState<CollectionTypeOption | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [newOption, setNewOption] = useState<CollectionTypeOption | null>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const fetch = useMemo(
    () =>
      debounce(async (query: string, callback: (results: readonly CollectionTypeOption[]) => void) => {
        setLoading(true)
        const { content } = await api.searchCollections(0, 100, query)
        callback(content.filter(i => i.kind === 'COLLECTION').map(p => ({ ...p, label: p.entity.title })))
        setLoading(false)
      }, 1500),
    []
  )

  const fetchCallback = (results?: readonly CollectionTypeOption[]) => {
    let newOptions: readonly CollectionTypeOption[] = []

    if (value) {
      newOptions = [value]
    }

    if (results) {
      newOptions = [
        ...newOptions,
        ...results.filter(function (item) {
          return item?.entity?.id !== value?.entity?.id
        })
      ]
    }

    // @ts-ignore
    setOptions(newOptions)
  }

  useEffect(() => {
    fetch(inputValue, fetchCallback)
  }, [])

  useEffect(() => {
    if (value) {
      // @ts-ignore
      setOptions([value])
    }
    handleSelect((value?.entity as CollectionType) || null)
  }, [value])

  useEffect(() => {
    let active = true

    setLoading(true)

    if (active) {
      fetch(inputValue, fetchCallback)
    }

    return () => {
      active = false
    }
  }, [inputValue, fetch])

  const addCallback = (collection: CollectionType | null) => {
    if (!collection) {
      setValue(null)
      return
    }
    const option: CollectionTypeOption = { entity: collection, kind: 'COLLECTION', label: collection.title }
    setOptions([option])
    setNewOption(option)
  }

  useEffect(() => {
    setValue(newOption)
  }, [newOption])

  console.log(optionsState, inputValue, value)

  return (
    <Autocomplete
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      onChange={(event, newValue) => {
        event.preventDefault()
        if (newValue?.entity!.id === 'new place') {
          createCollectionActions.open(addCallback, inputValue)
          setInputValue('')
          return
        }
        setValue(newValue)
      }}
      onBlur={e => {
        e.preventDefault()
        // @ts-ignore
        return onBlur && onBlur(e)
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        // Suggest the creation of a new value
        const isExisting = options.some(option => inputValue === option.entity!.title)
        if (inputValue !== '' && !isExisting && allowAdd) {
          filtered.push({
            // @ts-ignore
            entity: { id: 'new place', title: inputValue },
            title: inputValue,
            label: `Click here to add "${inputValue}" as a new collection in Rakonto.`
          })
        }

        return filtered
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.entity!.id}>
            {option.label}
          </li>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Type and select a collection title"
          name={name}
          error={error}
          helperText={helperText}
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
      options={optionsState}
      fullWidth
      getOptionLabel={option => option!.entity?.title || ''}
      inputValue={inputValue}
      value={value || undefined}
      size="small"
      loading={loading}
    />
  )
}

export default CollectionSearch
