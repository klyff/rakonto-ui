import styled from 'styled-components'

export const StatusBoxWrapper = styled.div`
  width: 100%;
  height: 15em;
  background-color: #000000;
  margin-top: 20px;
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
