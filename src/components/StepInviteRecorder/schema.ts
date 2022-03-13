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
  collection: yup
    .object()
    .shape({
      entity: yup
        .object()
        .shape({
          id: yup.string(),
          title: yup.string().required()
        })
        .required()
    })
    .nullable()
    .required('Collection must be selected')
    .label('Collection'),
  instructions: yup.string().required().label('Instructions'),
  file: yup
    .mixed()
    .test('fileSize', 'File is more large than 125 MB', value => !value || value?.size <= 250000000)
    .label('File'),
  recordingTypeValue: yup.string(),
  expire: yup.date().required().label('Date'),
  size: yup.number().min(1).required().label('Time limit'),
  title: yup.string().required().label('Title')
})
