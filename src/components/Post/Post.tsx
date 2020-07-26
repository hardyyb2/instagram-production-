import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { PostActions, addPost, addPostPayloadProps } from '../../store/actions'
import { IState } from '../../store/types'
import {
  checkIfFilesAreTooBig,
  checkIfFilesAreCorrectType,
} from '../../utils/helpers'

interface IProps {
  error: string | null
  loading: boolean
  addPostConnect: (payload: addPostPayloadProps) => void
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

const Post: React.FC<IProps> = ({ error, loading, addPostConnect }) => {
  const initialValues: MyFormValues = {
    image: new File([''], 'filename'),
    caption: '',
  }

  const handleAddPost = (values: MyFormValues) => {
    addPostConnect(values)
  }

  return (
    <div>
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
            <Form name='addPostForm' onSubmit={handleSubmit}>
              <input
                id='file'
                name='file'
                type='file'
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files![0])
                }}
              />
              {errors.image && touched.image && (
                <div>image error : {errors.image}</div>
              )}
              {error && <div>{error}</div>}

              <input
                id='caption'
                name='caption'
                type='text'
                placeholder='Enter caption...'
                value={values.caption}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.caption && touched.caption && (
                <div>caption error : {errors.caption}</div>
              )}
              {error && <div>{error}</div>}

              <button type='submit' disabled={loading}>
                Post
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
