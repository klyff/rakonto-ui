import styled from 'styled-components'
import { Menu as SMenu, Dropdown as SDropdown } from 'semantic-ui-react'

export const Menu = styled(SMenu)`
  &.ui {
    margin: 0;
    border-radius: 0;
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
