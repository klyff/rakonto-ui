import styled from 'styled-components'

export const ErrorMessage = styled.div`
  position: absolute;
  right: 0;
  color: red;
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  & > i.tiny.icons > i {
    margin: unset;
  }

  & > span {
    line-height: 1em;
    font-size: 0.8em;
    margin-left: 0.5em;
  }
`

export const FieldWrapper = styled.div`
  margin-bottom: 32px;
  position: relative;
`
