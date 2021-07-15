import styled from 'styled-components'

import { Layout as SLayout } from '../style'

export const Layout = styled(SLayout)`
  @media only screen and (max-width: 1024px) {
    height: calc(100% - 188px);
  }
`

export const Footer = styled.div`
  border-top: 1px solid rgba(34, 36, 38, 0.15);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px 33px 14px;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  & > div.ui.buttons {
    @media only screen and (max-width: 1024px) {
      width: 100%;
    }
  }
`
