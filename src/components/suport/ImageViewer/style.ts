import styled from 'styled-components'
import { Button as SButton } from 'semantic-ui-react'

export const Box = styled.div`
  display: flex;
  flex-flow: column;
`

export const Stage = styled.div`
  max-width: 90vw;
  min-width: 85vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 767px) {
    height: 85vh;
  }
`

export const PreviewArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 767px) {
    flex-flow: column;
  }
`

export const Header = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  & > i {
    cursor: pointer;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  right: 10px;
`

export const Button = styled(SButton)`
  &.ui.button {
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: unset;
    color: white;
    margin: 0.25em;
  }
`
