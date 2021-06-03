import { Field, FieldAttributes } from 'formik'
import { Icon, Input, Dropdown } from 'semantic-ui-react'
import { ErrorMessage, FieldWrapper, TextArea } from './style'
import React from 'react'
import { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown'

interface iFormField {
  name: string
  label?: string
  placeholder: string
  errorMessage?: string
  type?: string
  icon?: string
  isTextArea?: boolean
  isSelect?: boolean
  selectProps?: Partial<DropdownProps>
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
  isSelect = false,
  selectProps,
  rows,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => (
        <FieldWrapper
          className={
            isTextArea || isSelect
              ? (meta.touched && !!meta.error) || !!errorMessage
                ? 'ui form error'
                : 'ui form'
              : ''
          }
        >
          {label && <label>{label}</label>}
          {isSelect && <Dropdown as={Input} placeholder={placeholder} {...selectProps} />}
          {isTextArea && (
            <TextArea
              {...field}
              {...rest}
              rows={rows}
              name={name}
              error={((meta.touched && !!meta.error) || !!errorMessage).toString()}
              fluid="true"
              placeholder={placeholder}
            />
          )}
          {!isTextArea && !isSelect && (
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
