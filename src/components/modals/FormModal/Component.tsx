import React from 'react'
import { Formik } from 'formik'
import { useRecoilState } from 'recoil'
import { formModalState } from './state'
import Modal from '../ModalBasicLayout'

const FormModal: React.FC = () => {
  const [{ open, content, title, type, onClose, initialValues, validationSchema, onSubmit }, setOpen] =
    useRecoilState(formModalState)
  const close = () => {
    if (onClose) onClose()
    setOpen({
      open: false,
      title: '',
      content: '',
      type: 'default',
      initialValues: {},
      validationSchema: '',
      onSubmit: values => undefined
    })
  }
  const submit = (values: any) => {
    onSubmit(values)
    close()
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
      {({ submitForm }) => {
        const handleClose = async () => {
          await submitForm()
          close()
        }
        return <Modal open={open} content={content} title={title} type={type} onClose={handleClose} />
      }}
    </Formik>
  )
}

export default FormModal
