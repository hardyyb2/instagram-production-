import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Grid, Box, Button } from '@material-ui/core'

import {
  signupUser,
  clearError,
  AuthenticateAction,
} from '../../../store/actions/'
import { IState } from '../../../store/types'
import { SCTextField, SCConfirmModal } from '../../../SCcomponents'
import { Toast } from '../../../components'

import useStyles from './Signup.styles'

interface SignupProps {
  loading: boolean
  error: string | null
  isAuthenticated: boolean | null
  signupUserConnect: (user: MyFormValues) => void
  clearErrorConnect: () => void
}

interface MyFormValues {
  email: string
  password: string
  username: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is Required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password mus have atleast 8 characters'),
  username: Yup.string().required('Username is required'),
})

const Signup: React.FC<SignupProps> = ({
  loading,
  error,
  isAuthenticated,
  signupUserConnect,
  clearErrorConnect,
}) => {
  const classes = useStyles()
  const initialValues: MyFormValues = { email: '', password: '', username: '' }

  const toggleModal = () => clearErrorConnect()

  const handleSignup = (
    values: MyFormValues,
    { setErrors }: FormikHelpers<MyFormValues>
  ) => {
    setErrors({})
    clearErrorConnect()
    signupUserConnect(values)
  }

  if (isAuthenticated) {
    return <Redirect to='/home' />
  } else {
    return (
      <Grid container justify='center' className={classes.root}>
        <Grid container item xs={10} sm={4}>
          <Grid xs={12} sm={12} item className={classes.appbar}>
            Exogram
          </Grid>
          <Grid item className={classes.subHeader}>
            Sign up to see photos and videos from your friends.
          </Grid>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSignup}
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
                      type='email'
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
                    <SCTextField
                      id='username'
                      name='username'
                      type='name'
                      placeholder='Username'
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.username && touched.username && (
                      <Toast myMsg={errors.username} />
                    )}
                    <Button
                      type='submit'
                      disabled={
                        loading ||
                        !!errors.email ||
                        !!errors.password ||
                        !!errors.username
                      }
                      className={classes.loginButton}
                    >
                      Signup
                    </Button>
                  </Form>
                </Box>
              )
            }}
          </Formik>
          <Grid item className={classes.subFooter}>
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          Have and account?
          <Link to='/login' className={classes.loginLink}>
            Login
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
    signupUserConnect: (user: MyFormValues) => dispatch(signupUser(user)),
    clearErrorConnect: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
