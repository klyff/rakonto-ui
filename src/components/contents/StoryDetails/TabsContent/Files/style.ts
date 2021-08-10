import styled from 'styled-components'
import { List as SList } from 'semantic-ui-react'

export const UploadButtonArea = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
  @media only screen and (max-width: 1024px) {
    flex-flow: row-reverse;
  }
`

export const ProgressBox = styled.div`
  flex: 1;
  margin: 0 10px;
`

export const List = styled(SList)`
  overflow: auto;
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
