import { Field } from 'formik'
import { Icon, Input } from 'semantic-ui-react'
import React from 'react'

interface iFormField {
  name: string
  placeholder: string
  type?: string
  icon?: string
}

const Error: React.FC = ({ children }) => {
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

const FormField: React.FC<iFormField> = ({ name, placeholder, ...rest }) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors },
        meta
      }: any) => (
        <div
          style={{
            marginBottom: 32,
            position: 'relative'
          }}
        >
          <Input {...field} {...rest} name={name} error={meta.touched && meta.error} fluid placeholder={placeholder} />
          {meta.touched && meta.error && <Error>{meta.error}</Error>}
        </div>
      )}
    </Field>
  )
}

export default FormField
