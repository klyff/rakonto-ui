import styled from 'styled-components'

interface iLazyImageWrapper {
  height: number
}

export const LazyImageWrapper = styled.div<iLazyImageWrapper>`
  position: relative;
  & > .ui.placeholder,
  & > .ui.image {
    width: 100%;
    height: ${props => props.height}px;
  }

  & > .ui.placeholder {
    position: absolute;
    top: 0;
    left: 0;
  }
`
