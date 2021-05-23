import styled, { css } from 'styled-components'

interface iAvatarWrapper {
  size: 'small' | 'medium' | 'large'
  borderless: boolean
}

export const AvatarWrapper = styled.div<iAvatarWrapper>`
  border-radius: 10em;
  ${({ borderless }) =>
    !borderless &&
    css`
      border: 1px solid #000000;
    `}
  ${({ size }) => {
    if (size === 'small') {
      return css`
        height: 24px;
        width: 24px;
        font-size: 0.8em;
      `
    }
    if (size === 'large') {
      return css`
        height: 52px;
        width: 52px;
      `
    }
    return css`
      height: 36px;
      width: 36px;
    `
  }}
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    height: 100%;
    width: 100%;
  }
`
