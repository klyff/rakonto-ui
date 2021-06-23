import styled from 'styled-components'
import { Search as SSearch, List as SList, Button as SButton } from 'semantic-ui-react'

export const SearchButton = styled(SButton)`
  &.ui.button {
    margin-bottom: 12px;
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

export const List = styled(SList)`
  overflow: auto;
  height: 515px;
  padding-bottom: 30px !important;
  padding-right: 8px !important;

  @media only screen and (max-width: 1024px) {
    height: unset;
    padding-bottom: unset;
    padding-right: unset;
  }

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
