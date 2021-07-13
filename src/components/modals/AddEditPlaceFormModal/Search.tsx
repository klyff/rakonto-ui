import React, { useCallback, useEffect, useState } from 'react'
import { api } from '@root/api'
import { SearchProps, SearchResultData } from 'semantic-ui-react/dist/commonjs/modules/Search/Search'
import { SearchResultProps } from 'semantic-ui-react/dist/commonjs/modules/Search/SearchResult'
import { Search as SSearch, SearchItem } from './style'
import { LocationSearchType } from '@root/types'
import debounce from 'lodash.debounce'

interface iSearch {
  onSelected: (data: SearchResultData) => void
}

const Search: React.FC<iSearch> = ({ onSelected }) => {
  const [address, setAddress] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [locationList, setLocationList] = useState<LocationSearchType[]>([])

  const handleResultSelect = (event: React.MouseEvent<HTMLElement>, data: SearchResultData) => {
    onSelected(data)
    setAddress('')
  }

  const search = useCallback(
    debounce(async value => {
      setLoading(true)
      const result = await api.searchLocation(value)
      setLocationList(result)
      setLoading(false)
    }, 500),
    []
  )

  useEffect(() => {
    if (!address) return
    search(address)
  }, [address])

  const handleSearchChange = async (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
    const { value } = data
    setAddress(value || '')
  }

  // eslint-disable-next-line camelcase
  const renderResult = ({ display_name }: SearchResultProps) => <SearchItem>{display_name}</SearchItem>

  return (
    <SSearch
      fluid
      loading={loading}
      resultRenderer={renderResult}
      placeholder="Search for an address"
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={locationList}
      value={address}
    />
  )
}

export default Search
