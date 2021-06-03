import styled, { css } from 'styled-components'

interface iDropArea {
  isDragActive: boolean
  isDragAccept: boolean
  isDragReject: boolean
  thumbSrc: string
}

const DropAreaWrapper = styled.div<iDropArea>`
  margin-top: 20px;
  text-align: center;
  height: 186px;
  width: 328px;
  @media only screen and (max-width: 767px) {
    height: 124px;
    width: 219px;
    &.ui.placeholder.segment {
      min-height: unset;
    }
    & > .ui.header,
    & > .ui.icon.header .icon {
      font-size: 1em;
    }
  }
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
    ${({ thumbSrc }) => {
      console.log(thumbSrc)
      if (thumbSrc)
        return css`
          background-image: url(${thumbSrc});
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        `
    }};
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
`

DropAreaWrapper.defaultProps = {
  className: 'ui placeholder segment'
}

export { DropAreaWrapper }
