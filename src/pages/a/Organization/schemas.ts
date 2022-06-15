import * as yup from 'yup'

export const organizationSchema = yup.object().shape({
  logoId: yup.string().required().nullable().label('Logo'),
  name: yup.string().required().label('Organization'),
  addressLine1: yup.string().required().label('Address'),
  addressLine2: yup.string().label('Address'),
  city: yup.string().required().label('City'),
  state: yup.string().required().label('State'),
  postalCode: yup.string().required().label('Postal'),
  country: yup.string().required().label('Country'),
  phone: yup.string().required().label('Phone'),
  email: yup.string().email().required().label('Email'),
  socialFacebook: yup.string().url().label('Facebook'),
  socialTwitter: yup.string().url().label('Twitter'),
  socialInstagram: yup.string().url().label('Instagram'),
  socialLinkedin: yup.string().url().label('Linkedin'),
  socialWhatsapp: yup.string().url().label('Whatsapp')
})
