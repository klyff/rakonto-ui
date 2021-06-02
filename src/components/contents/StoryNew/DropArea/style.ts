import styled, { css } from 'styled-components'

interface iDropArea {
  isDragActive: boolean
  isDragAccept: boolean
  isDragReject: boolean
}

const DropAreaWrapper = styled.div<iDropArea>`
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
  height: 100%;
  width: 100%;
`

DropAreaWrapper.defaultProps = {
  className: 'ui placeholder segment'
}

export { DropAreaWrapper }
