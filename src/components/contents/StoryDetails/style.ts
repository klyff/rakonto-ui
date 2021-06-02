import styled from 'styled-components'

export const PreviewBox = styled.div`
  margin-top: 20px;
  width: 100%;
`
export const ColumnContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    flex-flow: column;
    & :nth-child(0) {
      order: 2;
    }
    & :nth-child(1) {
      order: 1;
    }
    & > div {
      margin-top: 20px;
      flex: 1;
      width: 100%;
    }
  }
`
export const ColumnForm = styled.div`
  flex: 1;
  padding: 0 12px;
`

export const ColumnPreview = styled.div`
  width: 504px;
  padding: 0 12px;
`
