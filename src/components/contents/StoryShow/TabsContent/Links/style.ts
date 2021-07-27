import styled from 'styled-components'
import { List as SList } from 'semantic-ui-react'

export const List = styled(SList)`
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
