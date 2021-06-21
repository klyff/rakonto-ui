import styled from 'styled-components'
import { Button as SButton } from 'semantic-ui-react'

export const Box = styled.div`
  display: flex;
  flex-flow: column;
`

export const PreviewArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin: 0 12px;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Button = styled(SButton)`
  &.ui.button {
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: unset;
    color: white;
  }
`
