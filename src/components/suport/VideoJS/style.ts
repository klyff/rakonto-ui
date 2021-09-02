import styled, { css } from 'styled-components'

export const Video = styled.video<{ preview?: string }>`
  ${props => {
    if (props.preview)
      return css`
        & > div.vjs-poster:hover {
          background-image: url(${props.preview}) !important;
        }
      `
  }}
`
