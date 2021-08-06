import styled from 'styled-components'
import { Card as SCard, Button as SButton } from 'semantic-ui-react'
import PlaceholderAudio from './PlaceholderAudio.png'
import PlaceholderVideo from './PlaceholderVideo.png'

export const Card = styled(SCard)`
  cursor: pointer;
  max-width: 329px;
  max-height: 340px;
  &:hover {
    box-shadow: 0 2px 6px 0 #bcbdbd, 0 0 0 2px #d4d4d5;
  }
  & > .lazyImage > .image > img {
    object-fit: contain;
    width: 100%;
    height: 200px;
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

  & > .lazyImage > .ui.image.video > img::after {
    background-image: url(${PlaceholderVideo});
  }

  & > .lazyImage > .ui.image.audio > img::after {
    background-image: url(${PlaceholderAudio});
  }
`

export const Description = styled(SCard.Description)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  height: 3em;
`

export const TextBasicEllipsis = styled(SCard.Meta)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Extra = styled.div`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  height: 1em;
  display: flex;
  align-items: center;
  & > .icon.audio,
  & > .icon.video {
    margin-right: 1rem;
  }
  & > .avatar {
    min-width: 24px;
    margin-right: 0.8rem;
  }
  & > span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 0.8rem;
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  line-height: 24px;
`
export const ActionButton = styled(SButton)`
  &.ui.basic.button,
  &.ui.basic.button:hover {
    box-shadow: unset;
  }
`
