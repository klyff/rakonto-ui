import { Field, FieldAttributes } from 'formik'
import { Icon, Input } from 'semantic-ui-react'
import React from 'react'

interface iFormField {
  name: string
  placeholder: string
  errorMessage?: string
  type?: string
  icon?: string
}

export const Error: React.FC = ({ children }) => {
  return (
    <span
      className="ui red basic errorMessage"
      style={{
        position: 'absolute',
        right: 0,
        color: 'red',
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.5em'
      }}
    >
      <Icon.Group size="tiny">
        <Icon
          name="circle outline"
          size="big"
          style={{
            margin: 'unset'
          }}
        />
        <Icon name="exclamation" />
      </Icon.Group>
      <span
        className="ui red basic errorMessage"
        style={{
          lineHeight: '1em',
          fontSize: '0.8em',
          marginLeft: '0.5em'
        }}
      >
        {children}
      </span>
    </span>
  )
}

const FormField: React.FC<iFormField> = ({ name, placeholder, errorMessage, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => (
        <div
          style={{
            marginBottom: 32,
            position: 'relative'
          }}
        >
          <Input
            {...field}
            {...rest}
            name={name}
            error={(meta.touched && !!meta.error) || !!errorMessage}
            fluid
            placeholder={placeholder}
          />
          {((meta.touched && !!meta.error) || !!errorMessage) && <Error>{meta.error || errorMessage}</Error>}
        </div>
      )}
    </Field>
  )
}

export default FormField
