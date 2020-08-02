import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Grid, Box, Button } from '@material-ui/core'
import TelegramIcon from '@material-ui/icons/Telegram'

import {
  forgotPassword,
  clearError,
  AuthenticateAction,
} from '../../../store/actions'
import { IState } from '../../../store/types'
import { SCTextField, SCConfirmModal } from '../../../SCcomponents'
import { Toast } from '../../../components'

import useStyles from './ForgotPassword.styles'

interface ForgotPasswordProps {
  loading: boolean
  error: string | null
  forgotPasswordConnect: (email: string) => any
  clearErrorConnect: () => void
}

interface MyFormValues {
  email: string
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is Required'),
})

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  loading,
  error,
  forgotPasswordConnect,
  clearErrorConnect,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const [emailSent, setEmailSent] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const initialValues: MyFormValues = { email: '' }

  const toggleModal = () => clearErrorConnect()

  const toggleEmailModal = () => setEmailSent(!emailSent)

  const handleForgotPassword = (
    values: MyFormValues,
    { setErrors }: FormikHelpers<MyFormValues>
  ) => {
    setErrors({})
    clearErrorConnect()
    setSubmitDisabled(true)
    forgotPasswordConnect(values.email)
      .then((res: any) => {
        if (res.success) {
          toggleEmailModal()
          setSubmitDisabled(false)
        }
      })
      .catch((err: any) => {
        setSubmitDisabled(false)
      })
  }

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid container item xs={10} sm={4}>
        <Grid xs={12} sm={12} item className={classes.appbar}>
          Forgot Password
        </Grid>
        <Grid item className={classes.subHeader}>
          Don't worry, enter your email and we will send an email with a link to
          reset your password.
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleForgotPassword}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
            } = props
            return (
              <Box width={'100%'}>
                <Form name='forgotpassword' onSubmit={handleSubmit}>
                  <SCTextField
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <Toast myMsg={errors.email} />
                  )}
                  <Button
                    type='submit'
                    startIcon={<TelegramIcon />}
                    disabled={loading || !!errors.email || submitDisabled}
                    className={classes.loginButton}
                  >
                    Send
                  </Button>
                </Form>
              </Box>
            )
          }}
        </Formik>
      </Grid>
      <SCConfirmModal
        open={!!error}
        header='Error'
        subHeader={error}
        confirm={'Try Again'}
        onConfirm={toggleModal}
        handleClose={toggleModal}
      />

      <SCConfirmModal
        open={emailSent}
        header='Email Sent'
        subHeader={`Check your email to reset password.`}
        confirm={'OK'}
        onConfirm={toggleEmailModal}
        handleClose={toggleEmailModal}
      />
    </Grid>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AuthenticateAction, {}, any>
) => {
  return {
    forgotPasswordConnect: (email: string) => dispatch(forgotPassword(email)),
    clearErrorConnect: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
