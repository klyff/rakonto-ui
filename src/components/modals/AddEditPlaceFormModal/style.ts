import styled from 'styled-components'
import { Search as SSearch } from 'semantic-ui-react'

export const SearchItem = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > div {
    margin-right: 8px;
  }
`

export const Search = styled(SSearch)`
  margin-top: 4px;
  & > .ui.input {
    display: flex;
    input {
      border-radius: unset;
    }
  }
`
