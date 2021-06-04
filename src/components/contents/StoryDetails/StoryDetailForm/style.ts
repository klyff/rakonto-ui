import styled from 'styled-components'
import { Form as FForm } from 'formik'

export const ColumnForm = styled.div`
  flex: 1;
  padding: 0 12px;
`

export const ColumnPreview = styled.div`
  width: 504px;
  padding: 0 12px;
`

export const Form = styled(FForm)`
  display: flex;
  margin-bottom: 50px;
  @media only screen and (max-width: 767px) {
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
      margin-top: 20px;
      flex: 1;
      width: 100%;
    }
  }
`
