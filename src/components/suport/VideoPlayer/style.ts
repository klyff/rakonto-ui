import styled from 'styled-components'

export const Video = styled.video<{ preview: string }>`
  & > div.vjs-poster:hover {
    background-image: url(${props => props.preview}) !important;
  }
`
