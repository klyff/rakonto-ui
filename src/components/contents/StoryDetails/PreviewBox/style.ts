import styled from 'styled-components'

export const PreviewBox = styled.div`
  margin-top: 20px;
  width: 100%;
  min-width: 426px;
  min-height: 240px;
  position: relative;
`

export const StatusBoxWrapper = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  background-color: #000000;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  i {
    margin-right: 0.2em;
  }
  div {
    width: 100%;
    .ui.header {
      font-size: 1em;
      color: white;
      margin-bottom: 8px;
    }
    .ui.progress {
      background-color: white;
    }
  }
`
