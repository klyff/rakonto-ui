import styled from 'styled-components'

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 66px);
  & > button {
    position: absolute;
    z-index: 2;
  }
  & > #myAudio {
    background-color: #9fd6ba;
  }
`
