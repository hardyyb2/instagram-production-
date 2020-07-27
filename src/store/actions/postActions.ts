import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { find, findIndex, isEmpty } from 'lodash'

import apiClient from '../../apiInstance'
import * as constants from '../constants'
import { objectToFormData } from '../../utils/helpers'
import { UserProps } from './userActions'
import { IState } from '../types'

export interface addPostPayloadProps {
  image: File
  caption: string
}

export interface commentProps {
  createdAt: string
  _id: string
  text: string
  postedBy: any
}

export interface postProps {
  likes: any[]
  _id: string
  comments: commentProps[]
  caption: string
  image: string
  postedBy: UserProps
  createdAt: string
  __v: number | string
}

interface requestPostProps {
  type: constants.REQUEST_POST
}

interface postErrorProps {
  type: constants.POST_ERROR
  error: string
}

interface addPostProps {
  type: constants.ADD_POST
}

interface receiveMyPostsProps {
  type: constants.RECEIVE_MY_POSTS
  data: postProps[]
}

interface receivePostsByIdProps {
  type: constants.RECEIVE_POSTS_BY_ID
  data: postProps[]
}

interface receivePostProps {
  type: constants.RECEIVE_POST
  data: postProps
}

interface deletePostProps {
  type: constants.POST_DELETED
}

interface receivedPostFeedProps {
  type: constants.RECEIVED_POST_FEED
  data: postProps[]
}

interface addLikeProps {
  type: constants.ADD_LIKE
}

interface removeLikeProps {
  type: constants.REMOVE_LIKE
}

interface addCommentProps {
  type: constants.ADD_COMMENT
}

interface removeCommentProps {
  type: constants.REMOVE_COMMENT
}

interface successProps {
  type: constants.SUCCESS
}

export interface commentPayloadProps {
  postId: string
  comment: { text: string } | { id: string }
}

const requestPost = (): requestPostProps => {
  return {
    type: constants.REQUEST_POST,
  }
}

const postError = (error: string): postErrorProps => {
  return {
    type: constants.POST_ERROR,
    error,
  }
}

const addedPost = (): addPostProps => {
  return {
    type: constants.ADD_POST,
  }
}

const receiveMyPosts = (data: postProps[]): receiveMyPostsProps => {
  return {
    type: constants.RECEIVE_MY_POSTS,
    data,
  }
}

const receivePostsById = (data: postProps[]): receivePostsByIdProps => {
  return {
    type: constants.RECEIVE_POSTS_BY_ID,
    data,
  }
}

const receivePost = (data: postProps): receivePostProps => {
  return {
    type: constants.RECEIVE_POST,
    data,
  }
}

const deletedPost = (): deletePostProps => {
  return {
    type: constants.POST_DELETED,
  }
}

const receivedPostFeed = (data: postProps[]): receivedPostFeedProps => {
  return {
    type: constants.RECEIVED_POST_FEED,
    data,
  }
}

const success = (): successProps => {
  return {
    type: constants.SUCCESS,
  }
}

export const addPost = (payload: addPostPayloadProps) => async (
  dispatch: Dispatch<PostActions, {}, any>,
  getState: () => IState
) => {
  dispatch(requestPost())
  try {
    const response = await apiClient().post(`/post`, objectToFormData(payload))
    let { data } = response.data
    const { avatar, username, _id } = getState().user.user
    //add user props to posted By
    data.postedBy = { avatar, username, _id }
    const otherPostData = Object.assign([], getState().post.otherPosts)
    //add current post to otherposts
    otherPostData.unshift(data)
    if (!isEmpty(otherPostData)) dispatch(receivedPostFeed(otherPostData))
    dispatch(addedPost())
    return new Promise((resolve, reject) => {
      resolve({ success: true })
    })
  } catch (err) {
    if (err.response === undefined) dispatch(postError('Something went wrong'))
    dispatch(postError(err.response.data.error))
  }
}

export const getPostByUserId = (userId: string) => async (
  dispatch: Dispatch<PostActions, {}, any>,
  getState: () => IState
) => {
  dispatch(requestPost())
  try {
    const response = await apiClient().get(`/post/${userId}`)
    const { data } = response.data
    // const myId = getState().user.user._id
    // myId === userId
    // ? dispatch(receiveMyPosts(data))
    dispatch(receivePostsById(data))
    return data
  } catch (err) {
    if (err.response === undefined) dispatch(postError('Something went wrong'))
    dispatch(postError(err.response.data.error))
  }
}

export const getPost = (postId: string) => async (
  dispatch: Dispatch<PostActions, {}, any>
) => {
  dispatch(requestPost())
  try {
    const response = await apiClient().get(`/post/get/${postId}`)
    const { data } = response.data
    dispatch(receivePost(data))
    return data
  } catch (err) {
    if (err.response === undefined) dispatch('Something went wrong')
    dispatch(postError(err.response.data.error))
  }
}

export const deletePost = (postId: string) => async (
  dispatch: Dispatch<PostActions, {}, any>
) => {
  dispatch(requestPost())
  try {
    await apiClient().delete(`/post/delete/${postId}`)
    dispatch(deletedPost())
    return
  } catch (err) {
    if (err.response === undefined) dispatch(postError('Something went wrong'))
    dispatch(postError(err.response.data.error))
  }
}

export const getPostFeed = () => async (
  dispatch: Dispatch<PostActions, {}, any>
) => {
  dispatch(requestPost())
  try {
    const response = await apiClient().get(`/post/feed`)
    const { data } = response.data
    dispatch(receivedPostFeed(data))
    return data
  } catch (err) {
    if (err.response === undefined) dispatch(postError('Something went wrong'))
    dispatch(postError(err.response.data.error))
  }
}

export const addLike = (postId: string) => async (
  dispatch: Dispatch<PostActions, {}, any>,
  getState: () => IState
) => {
  try {
    const response = await apiClient().put(`/post/addLike/${postId}`)
    const { data } = response.data
    const otherPosts = Object.assign([], getState().post.otherPosts)
    const reqPostIndex = findIndex(otherPosts, ['_id', data._id])
    otherPosts.splice(reqPostIndex, 1, data)

    const selectedPost = Object.assign({}, getState().post.selectedPost)
    if (!isEmpty(selectedPost) && selectedPost._id === postId) {
      selectedPost.likes = data.likes
      dispatch(receivePost(selectedPost))
    }
    dispatch(receivedPostFeed(otherPosts))
  } catch (err) {
    if (err.response === undefined) dispatch(postError('Something went wrong'))
    else dispatch(postError(err.response.data.error))
  }
}

export const removeLike = (postId: string) => async (
  dispatch: Dispatch<PostActions, {}, any>,
  getState: () => IState
) => {
  try {
    const response = await apiClient().put(`/post/removeLike/${postId}`)
    const { data } = response.data
    const otherPosts = Object.assign([], getState().post.otherPosts)
    const reqPostIndex = findIndex(otherPosts, ['_id', data._id])
    otherPosts.splice(reqPostIndex, 1, data)

    const selectedPost = Object.assign({}, getState().post.selectedPost)
    if (!isEmpty(selectedPost) && selectedPost._id === postId) {
      selectedPost.likes = data.likes
      dispatch(receivePost(selectedPost))
    }
    dispatch(receivedPostFeed(otherPosts))
  } catch (err) {
    if (err.response === undefined) dispatch(postError('Something went wrong'))
    else dispatch(postError(err.response.data.error))
  }
}

export const addComment = (payload: commentPayloadProps) => async (
  dispatch: Dispatch<PostActions, {}, any>,
  getState: () => IState
) => {
  try {
    const { postId, comment } = payload
    const response = await apiClient().put(`/post/comment/${postId}`, {
      comment,
    })
    const { data } = response.data
    // change state of other posts
    const otherPosts = Object.assign([], getState().post.otherPosts)
    const reqPostIndex = findIndex(otherPosts, ['_id', data._id])
    otherPosts.splice(reqPostIndex, 1, data)

    //changer state of selected post
    const selectedPost = Object.assign({}, getState().post.selectedPost)
    selectedPost.comments = data.comments

    dispatch(receivedPostFeed(otherPosts))
    dispatch(receivePost(selectedPost))
  } catch (err) {
    if (err.response === undefined) dispatch(postError('Something went wrong'))
    dispatch(postError(err.response.data.error))
  }
}

export const removeComment = (payload: commentPayloadProps) => async (
  dispatch: Dispatch<PostActions, {}, any>,
  getState: () => IState
) => {
  try {
    const { postId, comment } = payload
    const response = await apiClient().put(`/post/removecomment/${postId}`, {
      comment,
    })

    const { data } = response.data
    // change state of other posts
    const otherPosts = Object.assign([], getState().post.otherPosts)
    const reqPostIndex = findIndex(otherPosts, ['_id', data._id])
    otherPosts.splice(reqPostIndex, 1, data)

    //changer state of selected post
    const selectedPost = Object.assign({}, getState().post.selectedPost)
    selectedPost.comments = data.comments

    dispatch(receivedPostFeed(otherPosts))
    dispatch(receivePost(selectedPost))
  } catch (err) {
    if (err.response === undefined) dispatch(postError('Something went wrong'))
    dispatch(postError(err.response.data.error))
  }
}

export type PostActions =
  | requestPostProps
  | postErrorProps
  | addPostProps
  | receiveMyPostsProps
  | receivePostsByIdProps
  | receivePostProps
  | deletePostProps
  | receivedPostFeedProps
  | addLikeProps
  | removeLikeProps
  | successProps
