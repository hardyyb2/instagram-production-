import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

import {
  Grid,
  AppBar,
  TextField,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CheckIcon from '@material-ui/icons/Check'

import { IState } from '../../store/types'
import {
  UserActions,
  updateUserObjProps,
  updateUser,
  UserProps,
  toggleSnackBar,
} from '../../store/actions/userActions'
import { SCConfirmModal, SCProfileImage } from '../../SCcomponents'
import { clearError } from '../../store/actions'
import useStyles from '../Home/Home.styles'

interface IProps {
  loading: boolean
  userloading: boolean
  user: UserProps
  error: string | null
  updateUserConnect: (user: updateUserObjProps) => any
  clearErrorConnect: () => void
  toggleSnackBarConnect: (message: string) => void
}

const editProfileSchema = Yup.object().shape({
  username: Yup.string().required('Username is Required'),
  about: Yup.string(),
})

interface MyFormValues {
  username: string
  about: string
  avatar: File
}

const Home: React.FC<IProps> = ({
  error,
  user,
  loading,
  userloading,
  updateUserConnect,
  clearErrorConnect,
  toggleSnackBarConnect,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const [image, setImage] = useState('')

  const { avatar, username, about = '' } = user

  const initialValues: MyFormValues = {
    username,
    about,
    avatar: new File([''], 'filename'),
  }

  const toggleErrorModal = () => clearErrorConnect()
  const handleBackButton = () => history.goBack()

  const readURL = (image: File) => {
    setImage(URL.createObjectURL(image))
  }
  const handleUpdateProfile = async (values: MyFormValues) => {
    const res = await updateUserConnect(values)
    if (res.success === true && !error) {
      toggleSnackBarConnect('Profile Updated')
      history.goBack()
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={editProfileSchema}
        onSubmit={handleUpdateProfile}
      >
        {(props) => {
          const {
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          } = props
          return (
            <Grid container item xs={12} sm={12} className={classes.root}>
              <Grid container item xs={12} className={classes.body}>
                <Form
                  name='editprofile'
                  onSubmit={handleSubmit}
                  className={classes.form}
                >
                  <Grid
                    container
                    item
                    className={classes.formHeader}
                    xs={12}
                    sm={12}
                  >
                    <AppBar position='sticky' className={classes.appBar}>
                      <IconButton
                        edge='start'
                        className={classes.camera}
                        color='inherit'
                        aria-label='camera'
                        onClick={handleBackButton}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      <Typography variant='h6' className={classes.title}>
                        Edit
                      </Typography>
                      <IconButton
                        type='submit'
                        className={classes.message}
                        color='inherit'
                        aria-label='message'
                      >
                        <CheckIcon />
                      </IconButton>
                    </AppBar>
                  </Grid>
                  <Grid container item xs={12} className={classes.profileImage}>
                    <SCProfileImage
                      image={image ? image : avatar}
                      handleImageUpload={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setFieldValue('avatar', event.currentTarget.files![0])
                        readURL(event.currentTarget.files![0])
                      }}
                    />
                  </Grid>
                  <Grid container item xs={12}>
                    <TextField
                      id='username'
                      className={classes.textField}
                      name='username'
                      type='text'
                      placeholder='Username'
                      defaultValue={username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label='Username'
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.input,
                          focused: classes.focused,
                        },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: {
                          root: classes.label,
                          focused: classes.labelfocused,
                        },
                      }}
                      error={!!errors.username && touched.username}
                      helperText={
                        errors.username && touched.username
                          ? errors.username
                          : ' '
                      }
                    />
                    {error && (
                      <SCConfirmModal
                        open={!!error}
                        handleClose={toggleErrorModal}
                        header={'Error'}
                        subHeader={error}
                        confirm='Try again'
                        onConfirm={toggleErrorModal}
                      />
                    )}
                  </Grid>
                  <Grid container item xs={12}>
                    <TextField
                      id='about'
                      className={classes.textField}
                      name='about'
                      type='text'
                      placeholder='Bio'
                      defaultValue={about}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label='Bio'
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.input,
                          focused: classes.focused,
                        },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: {
                          root: classes.label,
                          focused: classes.labelfocused,
                        },
                      }}
                    />
                  </Grid>
                  <Button
                    type='submit'
                    disabled={userloading || !!errors.username}
                    variant='contained'
                    className={classes.saveButton}
                  >
                    {userloading ? 'Saving...' : 'Save'}
                  </Button>
                </Form>
              </Grid>
            </Grid>
          )
        }}
      </Formik>
    </>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user.user,
    loading: state.auth.loading,
    userloading: state.user.loading,
    error: state.auth.error,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    updateUserConnect: (user: updateUserObjProps) => dispatch(updateUser(user)),
    clearErrorConnect: () => dispatch(clearError()),
    toggleSnackBarConnect: (message: string) =>
      dispatch(toggleSnackBar(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
