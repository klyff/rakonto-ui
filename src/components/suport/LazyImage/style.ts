import styled from 'styled-components'

export const LazyImageWrapper = styled.div`
  position: relative;
  & > .ui.placeholder,
  & > .ui.image {
    width: 100%;
    height: 100%;
  }

  & > .ui.placeholder {
    position: absolute;
    max-width: unset;
    top: 0;
    left: 0;
    right: 0;
  }
`
