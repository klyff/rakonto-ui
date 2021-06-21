import styled from 'styled-components'
import { Search as SSearch, List as SList } from 'semantic-ui-react'

export const Search = styled(SSearch)`
  margin-top: 4px;
  & > .ui.input {
    display: flex;
    input {
      border-radius: unset;
    }
  }
`

export const List = styled(SList)`
  & > .ui.segment.item {
    padding: 12px;
  }
`

export const SearchItem = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > div {
    margin-right: 8px;
  }
`

export const Actions = styled.div`
  display: table-cell;
  vertical-align: middle;
  div {
    display: flex;
    .ui.button {
      background-color: unset;
    }
  }
`
