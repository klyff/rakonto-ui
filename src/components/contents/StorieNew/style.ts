import { Button, Segment } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

interface iDropArea {
  isDragActive: boolean
  isDragAccept: boolean
  isDragReject: boolean
}

export const DropArea = styled(Segment)<iDropArea>`
  text-align: center;
  &.ui.placeholder.segment {
    border-width: 2px;
    border-radius: 2px;
    ${({ isDragActive, isDragAccept, isDragReject }) => {
      if (isDragReject) {
        return css`
          border-color: #ff1744;
        `
      }
      if (isDragAccept) {
        return css`
          border-color: #00e676;
        `
      }
      if (isDragActive) {
        return css`
          border-color: #2196f3;
        `
      }
      return css`
        border-color: #eeeeee;
      `
    }};
    border-style: dashed;
    background-color: #fafafa;
  }
  &.ui.placeholder .header {
    margin: 1em;
  }
  &.ui.placeholder .header:not(:first-child):before {
    content: unset;
  }
  &.ui.placeholder button {
    margin-top: 1em;
  }
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
