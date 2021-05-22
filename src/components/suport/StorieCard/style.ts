import styled from 'styled-components'
import { Card as SCard } from 'semantic-ui-react'
import PlaceholderAudio from './PlaceholderAudio.png'
import PlaceholderVideo from './PlaceholderVideo.png'

export const Card = styled(SCard)`
  & > .lazyImage > .image > img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    background-color: black;
    position: relative;
  }

  & > .lazyImage > .image > img::after {
    content: ' ';
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  & > .lazyImage > .image.video > img::after {
    background-image: url(${PlaceholderVideo});
  }

  & > .lazyImage > .image.audio > img::after {
    background-image: url(${PlaceholderAudio});
  }
`
