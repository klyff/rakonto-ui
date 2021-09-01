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

const FieldWrapper = styled.div`
  margin-bottom: 30px;
  position: relative;
`

export const InputWrapper = styled(FieldWrapper)``

export const TextAreaWrapper = styled(FieldWrapper)`
  & > .field {
    display: flex;
    flex-flow: column;
    & > textarea {
      resize: none;
      border: 1px solid rgba(34, 36, 38, 0.15);
    }
    & > textarea:focus {
      border-color: #85b7d9;
      background: #ffffff;
      color: rgba(0, 0, 0, 0.8);
      box-shadow: none;
      border-width: 1px;
    }
    & > textarea:focus-visible {
      outline: none;
    }
  }
  & > .field.error > textarea {
    background-color: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
    box-shadow: none;
    &::placeholder {
      color: #e8bebd;
    }
  }

  & > .field.error > textarea:focus {
    &::placeholder {
      color: #da9796;
    }
  }
`

export const SelectWrapper = styled(FieldWrapper)`
  &.ui.form > div.dropdown {
    display: block;
  }
`
