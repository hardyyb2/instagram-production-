import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { makeStyles, Grid, Box, Button } from '@material-ui/core'

import {
  loginUser,
  clearError,
  AuthenticateAction,
} from '../../../store/actions'
import { IState } from '../../../store/types'
import { SCTextField, SCConfirmModal } from '../../../SCcomponents'
import { Toast } from '../../../components'

import useStyles from './Login.styles'

interface LoginProps {
  loading: boolean
  error: string | null
  isAuthenticated: boolean | null
  loginUserConnect: (user: MyFormValues) => void
  clearErrorConnect: () => void
}

interface MyFormValues {
  email: string
  password: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is Required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password too short'),
})

const Login: React.FC<LoginProps> = ({
  loading,
  error,
  isAuthenticated,
  loginUserConnect,
  clearErrorConnect,
}) => {
  const classes = useStyles()

  const initialValues: MyFormValues = { email: '', password: '' }

  const toggleModal = () => clearErrorConnect()

  const handleLogin = (
    values: MyFormValues,
    { setErrors }: FormikHelpers<MyFormValues>
  ): void => {
    setErrors({})
    clearErrorConnect()
    loginUserConnect(values)
  }

  if (isAuthenticated) {
    return <Redirect to='/home' />
  } else {
    return (
      <Grid container justify='center' className={classes.root}>
        <Grid container item xs={10} sm={4}>
          <Grid xs={12} sm={12} item className={classes.appbar}>
            Insta Clone
          </Grid>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
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
                  <Form name='loginForm' onSubmit={handleSubmit}>
                    <SCTextField
                      id='email'
                      name='email'
                      type='text'
                      placeholder='Email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <Toast myMsg={errors.email} />
                    )}

                    <SCTextField
                      id='password'
                      name='password'
                      type='password'
                      placeholder='Password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <Toast myMsg={errors.password} />
                    )}
                    <Button
                      type='submit'
                      disabled={loading || !!errors.email || !!errors.password}
                      className={classes.signupButton}
                    >
                      {loading ? 'Please Wait..' : 'Login'}
                    </Button>
                  </Form>
                </Box>
              )
            }}
          </Formik>
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          Don't have an account?
          <Link to='/signup' className={classes.signupLink}>
            SignUp
          </Link>
        </Grid>
        <SCConfirmModal
          open={!!error}
          header='Error'
          subHeader={error}
          confirm={'Try Again'}
          onConfirm={toggleModal}
          handleClose={toggleModal}
        />
      </Grid>
    )
  }
}

//check state type
const mapStateToProps = (state: IState) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AuthenticateAction, {}, any>
) => {
  return {
    loginUserConnect: (user: MyFormValues) => dispatch(loginUser(user)),
    clearErrorConnect: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
