import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'

export const ColumnForm = styled.div`
  padding: 0 12px;
  max-width: 426px;
  min-width: 426px;
  @media only screen and (max-width: 1024px) {
    margin-top: 20px;
    min-width: unset;
    max-width: unset;
  }
`

export const ColumnPreview = styled.div`
  width: fit-content;
  padding: 0 12px;
  min-width: 450px;
  max-width: 720px;
  flex: 1;
`

export const FormColumnsArea = styled.div`
  display: flex;
  margin-bottom: 50px;
  & > div:last-child {
    margin-top: 20px;
  }
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    flex-flow: column;
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
  height: 15em;
  overflow: auto;
`
