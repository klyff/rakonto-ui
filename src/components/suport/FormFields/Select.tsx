import { useField } from 'formik'
import { Icon } from 'semantic-ui-react'
import { ErrorMessage, SelectWrapper } from './style'
import React from 'react'
import { Select as _Select } from 'formik-semantic-ui-react'
import { SelectProps } from 'formik-semantic-ui-react/dist/Select'

interface iTextArea extends SelectProps {
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

const TextArea: React.FC<iTextArea> = ({ errorMessage, ...rest }) => {
  const [, meta] = useField(rest.name)
  return (
    <SelectWrapper>
      <_Select {...rest} error={(meta.touched && !!meta.error) || !!errorMessage} fluid />
      {((meta.touched && !!meta.error) || !!errorMessage) && <Error>{meta.error || errorMessage}</Error>}
    </SelectWrapper>
  )
}

export default TextArea
