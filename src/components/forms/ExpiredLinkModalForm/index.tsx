import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { api } from '@root/api'
import { basicModalState } from '@root/components/modals/BasicModal'
import { Form, Formik } from 'formik'
import FormField from '@root/components/suport/FormField'
import schema from './schema'
import { useSetRecoilState } from 'recoil'

const ExpiredLinkModalForm = () => {
  const history = useHistory()
  const setBasicModalState = useSetRecoilState(basicModalState)

  const handleSubmit = async ({ email }: any) => {
    try {
      await api.requestConfirmEmail(email)
      setBasicModalState({
        open: true,
        title: 'Request confirm email',
        content: (
          <>
            In the next few minutes, we are sending another confirmation e-mail.
            <br />
            <br />
            Please, verify our e-mail box and confirm it.
          </>
        )
      })
      history.push('/u/signin')
    } catch (error) {
      history.push('/u/signin')
    }
  }

  return (
    <>
      <div
        style={{
          marginBottom: '16px'
        }}
      >
        This link has expired. Please enter your email address to resend another link to you to confirm your account.
      </div>
      <div>
        <Formik initialValues={{ email: '' }} validationSchema={schema} onSubmit={handleSubmit}>
          <Form>
            <FormField name="email" placeholder="E-mail address" />
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default ExpiredLinkModalForm
