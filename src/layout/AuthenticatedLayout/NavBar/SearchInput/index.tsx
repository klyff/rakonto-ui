import { Search } from 'semantic-ui-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useSuggestionApi } from './useSuggestionApi'
import { SearchProps } from 'semantic-ui-react/dist/commonjs/modules/Search/Search'
import debounce from 'lodash.debounce'
import { useLocation, useHistory } from 'react-router-dom'
import { parse, stringify } from 'qs'

const SearchInput: React.FC = () => {
  const { getSuggestions, loading, suggestions } = useSuggestionApi()
  const { search } = useLocation()
  const history = useHistory()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { q } = parsedQs

  const [value, setValue] = useState<string>((q as string) || '')

  const updateQueryString = useCallback(
    debounce((text: string) => {
      const search = stringify(
        {
          ...parsedQs,
          q: text
        },
        { addQueryPrefix: true }
      )
      history.push({
        pathname: '/a/home',
        search
      } as unknown as Location)
    }, 500),
    []
  )

  useEffect(() => {
    getSuggestions(value || (q as string))
  }, [value])

  const handleSearchChange = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
    setValue(data.value || '')
  }

  const handleResultSelect = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
    const text = data.result.title
    updateQueryString(text)
    setValue(text)
  }

  const handleEnter = (event: { charCode: number; target: HTMLInputElement }) => {
    if (event.charCode !== 13) return
    updateQueryString(event.target.value)
  }

  return (
    <Search
      showNoResults={false}
      onKeyPress={handleEnter}
      placeholder="Search..."
      loading={loading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={suggestions.map((suggestion, i) => ({ key: i, title: suggestion }))}
      value={value}
    />
  )
}

export default SearchInput
