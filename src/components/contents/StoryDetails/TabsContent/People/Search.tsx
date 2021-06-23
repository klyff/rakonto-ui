import React, { useState } from 'react'
import { Search as SSearch, SearchItem } from './style'
import { SearchResultData } from 'semantic-ui-react/dist/commonjs/modules/Search/Search'
import { SearchResultProps } from 'semantic-ui-react/dist/commonjs/modules/Search/SearchResult'
import { PersonType } from '@root/types'
import Avatar from '@root/components/suport/Avatar'

interface iSearch {
  personList: PersonType[]
  loading: boolean
  onChange: (data: SearchResultData) => void
  onSelected: (data: SearchResultData) => void
}

const Search: React.FC<iSearch> = ({ personList, onChange, onSelected, loading }) => {
  const [value, setValue] = useState<string>('')

  const handleResultSelect = (event: React.MouseEvent<HTMLElement>, data: SearchResultData) => {
    onSelected(data)
    setValue('')
  }

  const handleSearchChange = (event: React.MouseEvent<HTMLElement>, data: SearchResultData) => {
    onChange(data)
    setValue(data.value || '')
  }

  return (
    <SSearch
      fluid
      loading={loading}
      resultRenderer={({ name, picture }: SearchResultProps) => (
        <SearchItem>
          <Avatar name={name} src={picture?.thumbnail} size="small" />
          {name}
        </SearchItem>
      )}
      placeholder="Search for existing person"
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={personList.map(person => ({ ...person, title: person.name }))}
      value={value}
    />
  )
}

export default Search
