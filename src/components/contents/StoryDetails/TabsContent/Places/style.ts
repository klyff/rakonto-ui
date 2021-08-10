import styled from 'styled-components'
import { List as SList, Button as SButton } from 'semantic-ui-react'

export const AddButton = styled(SButton)`
  &.ui.button {
    margin-bottom: 12px;
  }
`

export const List = styled(SList)`
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
  min-width: 500px;
  & > div:not(:last-child & :first-child) {
    padding: 8px 16px;
  }
  & > div:last-child {
    height: 260px;
  }

  @media only screen and (max-width: 1024px) {
    min-width: unset;
  }
`

export const Actions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`
