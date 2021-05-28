import styled from 'styled-components'
import { TextArea as STextArea } from 'semantic-ui-react'

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

  &.ui.form.error > textarea {
    background-color: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
    box-shadow: none;
    &::placeholder {
      color: #e8bebd;
    }
  }

  &.ui.form.error > textarea:focus {
    &::placeholder {
      color: #da9796;
    }
  }
`

export const TextArea = styled(STextArea)``
