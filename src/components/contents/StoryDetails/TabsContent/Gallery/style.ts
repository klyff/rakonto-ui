import styled from 'styled-components'
import { Grid as SGrid, GridColumn as SGridColumn, Dropdown } from 'semantic-ui-react'

export const Grid = styled(SGrid)`
  &.ui.grid {
    margin-top: 4px;
  }
  overflow: auto;
  height: calc(100% - 64px);
  @media only screen and (max-width: 1024px) {
    overflow: unset;
    height: inherit;
  }
`

export const GridColumn = styled(SGridColumn)`
  position: relative;
`
export const Actions = styled(Dropdown)`
  background: #e0e1e2 none;
  z-index: 1;
  border-radius: 10em;
  padding: 0.78571429em 0.78571429em 0.78571429em;
  &.ui.dropdown {
    position: absolute;
    top: 20px;
    right: 20px;
    i.icon {
      margin: unset;
      width: 1.358em;
    }
  }
`
