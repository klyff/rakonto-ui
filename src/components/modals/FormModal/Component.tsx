import React from 'react'
import { Formik, FormikValues } from 'formik'
import { useRecoilState } from 'recoil'
import { formModalState } from './state'
import Modal from '../ModalBasicLayout'

const FormModal: React.FC = () => {
  const [{ open, content, title, type, onClose, initialValues, validationSchema, onSubmit, isConfirmation }, setOpen] =
    useRecoilState(formModalState)

  const close = (isSuccess: boolean) => {
    if (onClose) onClose(isSuccess)
    setOpen({
      open: false,
      title: '',
      content: '',
      type: 'default',
      initialValues: {},
      validationSchema: '',
      onSubmit: () => undefined
    })
  }

  const submit = (values: FormikValues) => {
    onSubmit(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
      {({ submitForm }) => {
        const handleClose = async (isSuccess: boolean) => {
          if (isSuccess) await submitForm()
          close(isSuccess)
        }
        return (
          <Modal
            open={open}
            content={content}
            title={title}
            type={type}
            onClose={handleClose}
            isConfirmation={!!isConfirmation}
          />
        )
      }}
    </Formik>
  )
}

export default FormModal
