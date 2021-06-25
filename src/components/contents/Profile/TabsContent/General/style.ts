import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  flex-flow: column;
  width: 400px;
  @media only screen and (max-width: 1024px) {
    width: unset;
  }
`
