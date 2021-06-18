import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'

import { ColumnForm as SColumnForm } from '../../style'

export const ColumnForm = styled(SColumnForm)`
  max-width: 426px;
  min-width: 426px;
  @media only screen and (max-width: 1024px) {
    max-width: unset;
    min-width: unset;
  }
`

export const FormColumnsArea = styled.div`
  display: flex;
  overflow: auto;
  & > div:last-child {
    margin-top: 20px;
  }
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    flex-flow: column;
    height: calc(100vh - 300px);
    & :nth-child(1) {
      order: 2;
    }
    & :nth-child(2) {
      order: 1;
    }
    & :last-child {
      order: 3;
    }
    & > div {
      flex: 1;
      width: 100%;
    }
  }
`

export const WhatchersContainer = styled(Segment)`
  height: 26em;
  overflow-y: auto;
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
