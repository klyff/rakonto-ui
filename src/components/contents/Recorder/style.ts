import styled from 'styled-components'

export const Box = styled.div`
  max-width: 1080px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    position: absolute;
    z-index: 2;
  }
  & > #myAudio {
    background-color: #9fd6ba;
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 66px);
`
