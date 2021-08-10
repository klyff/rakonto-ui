import styled from 'styled-components'
import { List as SList } from 'semantic-ui-react'

export const List = styled(SList)`
  padding-bottom: 30px !important;
  padding-right: 8px !important;

  @media only screen and (max-width: 1024px) {
    height: unset;
    padding-bottom: unset;
    padding-right: unset;
  }

  & > .ui.segment.item {
    padding: 12px;
    i {
      vertical-align: middle;
    }
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

export const Box = styled.div`
  display: flex;
  flex-flow: column;
  & > .ui.selection {
    margin-bottom: 32px;
  }
`
