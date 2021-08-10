import styled from 'styled-components'

import { Layout as SLayout } from '../style'

export const SaveButtonArea = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
  @media only screen and (max-width: 1024px) {
    flex-flow: row-reverse;
  }
`

export const Layout = styled(SLayout)`
  @media only screen and (max-width: 1024px) {
    height: calc(100% - 188px);
  }
`
