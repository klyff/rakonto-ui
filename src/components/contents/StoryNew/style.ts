import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const DropAreaBox = styled.div`
  height: 50vh;
`

const SelectFileButton = styled(Button)`
  &.ui.button {
    margin-top: 3em;
    margin-bottom: 1.5em;
  }
`

SelectFileButton.defaultProps = {
  fluid: true,
  size: 'massive'
}

const HugeButton = styled(Button)`
  &.ui.button {
    display: flex;
    flex-flow: column;
    align-items: center;
    i.icon:not(.button):not(.dropdown) {
      margin: unset;
      color: #4471c3;
    }
    h3 {
      font-weight: 300;
    }
  }
`

HugeButton.defaultProps = {
  fluid: true,
  size: 'massive'
}

export { HugeButton, SelectFileButton }
