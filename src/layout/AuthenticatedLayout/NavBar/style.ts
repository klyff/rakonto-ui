import styled from 'styled-components'
import { Menu as SMenu, Dropdown as SDropdown } from 'semantic-ui-react'

export const Menu = styled(SMenu)`
  &.ui {
    margin: 0;
    border-radius: 0;
  }
`

export const Search = styled(Menu.Item)`
  flex: 1 !important;
  justify-content: center;
  & > div {
    max-width: 531px;
    min-width: 0px;
  }
`

export const Dropdown = styled(SDropdown)`
  border-left: 1px solid rgba(34, 36, 38, 0.15);
  position: relative;
  width: 68px;
  & > i {
    display: none;
  }
`

export const Logo = styled.div`
  width: 122px;
  height: 36px;
  background-image: url('/images/logo2.svg');
  background-repeat: no-repeat;
  @media only screen and (max-width: 767px) {
    width: 36px;
    background-image: url('/images/logo.svg');
  }
`
