import styled from 'styled-components'
import { Search as SSearch, List as SList, Button as SButton } from 'semantic-ui-react'

export const AddButton = styled(SButton)`
  &.ui.button {
    margin-bottom: 12px;
  }
`

export const OcurrenciesArea = styled.div`
  height: calc(100vh - 281px);
`

export const List = styled(SList)`
  overflow: auto;
  height: calc(100% - 212px);
  padding-bottom: 30px !important;
  padding-right: 8px !important;

  @media only screen and (max-width: 1024px) {
    height: unset;
    padding-bottom: unset;
    padding-right: unset;
  }
`

export const Item = styled.div`
  position: relative;
`

export const Actions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`
