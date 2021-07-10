import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

export const ButtonUpload = styled(Button)`
  &.button,
  &.ui.basic.button {
    box-shadow: unset !important;
    margin: 8px 0px 8px -21px;
  }
  &.ui.basic.button:focus {
    box-shadow: unset !important;
  }
  &.ui.basic.button:active {
    box-shadow: unset !important;
    background-color: unset;
  }
  &.ui.basic.button:hover {
    box-shadow: unset !important;
  }
`

export const AdvisorWrapper = styled.div`
  margin: 10px 0px 10px 0px;
`
