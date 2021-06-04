import { useField } from 'formik'
import { Icon } from 'semantic-ui-react'
import { ErrorMessage, TextAreaWrapper } from './style'
import React from 'react'
import { TextArea as _TextArea } from 'formik-semantic-ui-react'
import { TextAreaProps } from 'formik-semantic-ui-react/dist/TextArea'

interface iTextArea extends TextAreaProps {
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
    <TextAreaWrapper>
      <_TextArea {...rest} error={(meta.touched && !!meta.error) || !!errorMessage} />
      {((meta.touched && !!meta.error) || !!errorMessage) && <Error>{meta.error || errorMessage}</Error>}
    </TextAreaWrapper>
  )
}

export default TextArea
