import * as yup from 'yup'

export const schemaStep4 = yup.object().shape(
  {
    emails: yup
      .array()
      .of(
        yup.object().shape({
          email: yup.string().email(),
          name: yup.string()
        })
      )
      .label('Recorders'),
    email: yup.string().when('name', {
      is: (value: string) => !!value,
      then: yup.string().email().required().label('Email'),
      otherwise: yup.string().email().label('Email')
    }),
    name: yup.string().when('email', {
      is: (value: string) => !!value,
      then: yup.string().required().label('Name'),
      otherwise: yup.string().label('Name')
    })
  },
  // @ts-ignore
  ['name', 'email']
)

export const schema = yup.object().shape({
  instructions: yup.string().required().label('Instructions'),
  recordingTypeValue: yup.string(),
  expire: yup.date().label('Date').nullable(),
  title: yup.string().required().label('Title')
})
