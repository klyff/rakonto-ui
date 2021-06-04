import { useField } from 'formik'
import { Icon } from 'semantic-ui-react'
import { ErrorMessage, InputWrapper } from './style'
import React from 'react'
import { Input as _Input } from 'formik-semantic-ui-react'
import { InputProps } from 'formik-semantic-ui-react/dist/Input'

interface iInput extends InputProps {
  errorMessage?: string
  label?: string
}

export const Error: React.FC = ({ children }) => {
  return (
    <ErrorMessage className="ui red basic errorMessage">
      <Icon.Group size="tiny">
        <Icon name="circle outline" size="big" />
        <Icon name="exclamation" />
      </Icon.Group>
      <span className="ui red basic errorMessage">{children}</span>
    </ErrorMessage>
  )
}

const Input: React.FC<iInput> = ({ errorMessage, ...rest }) => {
  const [, meta] = useField(rest.name)
  return (
    <InputWrapper>
      <_Input {...rest} error={(meta.touched && !!meta.error) || !!errorMessage} fluid />
      {((meta.touched && !!meta.error) || !!errorMessage) && <Error>{meta.error || errorMessage}</Error>}
    </InputWrapper>
  )
}

export default Input
