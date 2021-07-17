import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'

export const WhatchersContainer = styled(Segment)`
  height: 26em;
  overflow-y: auto;
`

export const Box = styled.div`
  & > div {
    margin-bottom: 32px;
  }
`

export const Actions = styled.div`
  display: table-cell;
  vertical-align: middle;
  div {
    display: flex;
    i {
      cursor: pointer;
    }
  }
`