import styled from 'styled-components'

export const Box = styled.div`
  padding-bottom: 100px;
`

export const CollectionArea = styled.div`
  display: flex;
  & > div:first-child {
    @media only screen and (max-width: 1024px) {
      order: 1;
    }
    flex: 1;
    margin-right: 8px;
  }

  & > div:last-child {
    margin-top: 20px;
    margin-bottom: 32px;
  }
`
