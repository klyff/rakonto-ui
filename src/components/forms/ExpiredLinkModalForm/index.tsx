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
        title: 'Confirm email',
        content: <>We sent an email to you to confirm your account. Please check this.</>
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
            <FormField name="email" placeholder="Email address" />
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default ExpiredLinkModalForm
