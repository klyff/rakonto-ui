import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  overflow: auto;
  height: calc(100% - 57px);
  & > div:last-child {
    margin-top: 20px;
  }
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    flex-flow: column;
    overflow-x: hidden;
    height: calc(100% - 136px);
    & :nth-child(1) {
      order: 2;
    }
    & :nth-child(2) {
      order: 1;
    }
    & > div {
      flex: 1;
      width: 100%;
    }
  }

  @media only screen and (max-width: 767px) {
    height: calc(100% - 140px);
  }
`

export const ColumnForm = styled.div`
  padding: 0 12px;
  flex: 1;
  height: inherit;
  @media only screen and (max-width: 1024px) {
    flex: unset;
    margin-top: 20px;
  }
`

export const ColumnPreview = styled.div`
  width: fit-content;
  padding: 0 12px;
  min-width: 450px;
  max-width: 720px;
  flex: 1;
`
