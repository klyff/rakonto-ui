import { Field, FieldAttributes } from 'formik'
import { Icon, Input } from 'semantic-ui-react'
import { ErrorMessage, FieldWrapper, TextArea } from './style'
import React from 'react'

interface iFormField {
  name: string
  label?: string
  placeholder: string
  errorMessage?: string
  type?: string
  icon?: string
  isTextArea?: boolean
  rows?: number
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

const FormField: React.FC<iFormField> = ({
  name,
  label,
  placeholder,
  errorMessage,
  isTextArea = false,
  rows,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => (
        <FieldWrapper
          className={isTextArea ? ((meta.touched && !!meta.error) || !!errorMessage ? 'ui form error' : 'ui form') : ''}
        >
          {label && <label>{label}</label>}
          {isTextArea ? (
            <TextArea
              {...field}
              {...rest}
              rows={rows}
              name={name}
              error={((meta.touched && !!meta.error) || !!errorMessage).toString()}
              fluid="true"
              placeholder={placeholder}
            />
          ) : (
            <Input
              {...field}
              {...rest}
              name={name}
              error={(meta.touched && !!meta.error) || !!errorMessage}
              fluid
              placeholder={placeholder}
            />
          )}
          {((meta.touched && !!meta.error) || !!errorMessage) && <Error>{meta.error || errorMessage}</Error>}
        </FieldWrapper>
      )}
    </Field>
  )
}

export default FormField
