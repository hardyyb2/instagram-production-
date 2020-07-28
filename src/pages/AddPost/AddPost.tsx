import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
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

import {
  PostActions,
  addPost,
  addPostPayloadProps,
  clearError,
} from '../../store/actions'
import { IState } from '../../store/types'
import {
  checkIfFilesAreTooBig,
  checkIfFilesAreCorrectType,
} from '../../utils/helpers'
import { useStyles } from '../Home/Home'
import { SCProfileImage, SCConfirmModal } from '../../SCcomponents'

interface IProps {
  error: string | null
  loading: boolean
  addPostConnect: (payload: addPostPayloadProps) => any
  clearErrorConnect: () => void
}

const addPostSchema = Yup.object().shape({
  caption: Yup.string().required('caption is Required'),
  image: Yup.mixed()
    .required('An Image is required')
    .test(
      'is-correct-file',
      'Only Images (jpeg/png) allowed',
      checkIfFilesAreTooBig
    )
    .test('is-big-file', 'Image size too large', checkIfFilesAreCorrectType),
})

interface MyFormValues {
  image: File
  caption: string
}

const Post: React.FC<IProps> = ({
  error,
  loading,
  addPostConnect,
  clearErrorConnect,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const [image, setImage] = useState('')

  const initialValues: MyFormValues = {
    image: new File([''], 'filename'),
    caption: '',
  }

  const toggleErrorModal = () => clearErrorConnect()
  const handleBackButton = () => history.goBack()

  const readURL = (image: File) => {
    setImage(URL.createObjectURL(image))
  }

  const handleAddPost = async (values: MyFormValues) => {
    const res = await addPostConnect(values)
    if (res.success === true && !error) {
      history.goBack()
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={addPostSchema}
        onSubmit={handleAddPost}
      >
        {(props) => {
          const {
            values,
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
                  name='addPostForm'
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
                        Post
                      </Typography>
                      <IconButton
                        type='submit'
                        className={classes.message}
                        color='inherit'
                        aria-label='save'
                      >
                        <CheckIcon />
                      </IconButton>
                    </AppBar>
                  </Grid>
                  <Grid container item xs={12} className={classes.profileImage}>
                    <SCProfileImage
                      size={'320px'}
                      image={
                        image ? image : '/assets/uploads/avatars/default.svg'
                      }
                      handleImageUpload={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setFieldValue('image', event.currentTarget.files![0])
                        readURL(event.currentTarget.files![0])
                      }}
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
                      id='caption'
                      className={classes.textField}
                      name='caption'
                      type='text'
                      placeholder='Caption'
                      value={values.caption}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label='Caption'
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
                      error={!!errors.caption && touched.caption}
                      helperText={
                        errors.caption && touched.caption ? errors.caption : ' '
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

                  <Button
                    type='submit'
                    disabled={
                      loading || !!errors.caption || !!errors.image || !image
                    }
                    variant='contained'
                    className={classes.saveButton}
                  >
                    {loading ? 'Posting...' : 'Post'}
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
    error: state.post.error,
    loading: state.post.loading,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<PostActions, {}, any>) => {
  return {
    addPostConnect: (payload: addPostPayloadProps) =>
      dispatch(addPost(payload)),
    clearErrorConnect: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
