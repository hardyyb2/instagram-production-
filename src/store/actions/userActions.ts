import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { get, findIndex } from 'lodash'

import apiClient from '../../apiInstance'
import * as constants from '../constants'
import { objectToFormData } from '../../utils/helpers'
import { IState } from '../types'

export interface UserProps {
  avatar: string
  account_created: string
  following: (userFeedUsers | string)[]
  followers: (userFeedUsers | string)[]
  requesting: (userFeedUsers | string)[]
  requested: (userFeedUsers | string)[]
  _id: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
  about: string
}

export interface requestUserProps {
  type: constants.REQUEST_USER
}

export interface userDetailsProps {
  type: constants.USER_DETAILS
  user: UserProps | null
}

export interface getUserByIdProps {
  type: constants.GET_USER_BY_ID
  user: UserProps | null
}

export interface getUserErrorProps {
  type: constants.GET_USER_ERROR
  error: string | null
}

export interface getAllUserProps {
  type: constants.GET_ALL_USERS
  users: UserProps[] | null
}

export interface deleteUserProps {
  type: constants.DELETE_USER
}

export interface updateUserObjProps {
  username: string
  avatar: File
  about: string
}

export interface updateUserProps {
  type: constants.UPDATE_USER
  user: updateUserObjProps
}

export interface addFollowerObj {
  userId: string
  follow: boolean
  removeRequest?: boolean
}

export interface userFeedUsers {
  avatar: string
  _id: string
  username: string
}

export interface UpdatedUserProps {
  type: constants.GET_USER_FEED
  userFeed: userFeedUsers[]
}

export type ThemeOptions = 'light' | 'dark'

interface changeThemeProps {
  type: constants.CHANGE_THEME
  theme: ThemeOptions
}

export interface toggleSnackBarProps {
  type: constants.TOGGLE_SNACKBAR
  message: string
}

const requestUser = (): requestUserProps => {
  return {
    type: constants.REQUEST_USER,
  }
}
const setUserDetails = (user: null | any): userDetailsProps => {
  return {
    type: constants.USER_DETAILS,
    user,
  }
}

const getUserError = (error: string | null): getUserErrorProps => {
  return {
    type: constants.GET_USER_ERROR,
    error,
  }
}

export const setAllUsers = (users: null | any[]): getAllUserProps => {
  return {
    type: constants.GET_ALL_USERS,
    users,
  }
}

export const setUserById = (user: null | any): getUserByIdProps => {
  return {
    type: constants.GET_USER_BY_ID,
    user,
  }
}

export const deletedUser = (): deleteUserProps => {
  return {
    type: constants.DELETE_USER,
  }
}

export const updatedUser = (user: updateUserObjProps): updateUserProps => {
  return {
    type: constants.UPDATE_USER,
    user,
  }
}

export const toggleSnackBar = (message: string): toggleSnackBarProps => {
  return {
    type: constants.TOGGLE_SNACKBAR,
    message,
  }
}

export const changedTheme = (theme: ThemeOptions): changeThemeProps => {
  return {
    type: constants.CHANGE_THEME,
    theme,
  }
}

export const updatedUserFeed = (
  userFeed: userFeedUsers[]
): UpdatedUserProps => {
  return {
    type: constants.GET_USER_FEED,
    userFeed,
  }
}

export const changeTheme = (theme: ThemeOptions) => async (
  dispatch: Dispatch<UserActions, {}, any>
) => {
  dispatch(changedTheme(theme))
}
export const getUserDetails = () => async (
  dispatch: Dispatch<UserActions, {}, any>
) => {
  dispatch(requestUser())
  try {
    const response = await apiClient().get('/user')
    const { data } = response.data
    dispatch(setUserDetails(data))
    return data
  } catch (err) {
    console.log(err)
    if (err.response === undefined)
      dispatch(getUserError('Something went wrong'))
    dispatch(getUserError(err.response.data.error))
  }
}

export const getAllUsers = () => async (
  dispatch: Dispatch<UserActions, {}, any>
) => {
  dispatch(requestUser())
  try {
    const response = await apiClient().get('/user/all')
    const { data } = response.data
    dispatch(setAllUsers(data))
    return data
  } catch (err) {
    if (err.response === undefined)
      dispatch(getUserError('Something went wrong'))
    dispatch(getUserError(err.response.data.error))
  }
}

export const getUserById = (id: string) => async (
  dispatch: Dispatch<UserActions, {}, any>
) => {
  dispatch(requestUser())
  try {
    const response = await apiClient().get(`/user/${id}`)
    const { data } = response.data
    dispatch(setUserById(data))
    return data
  } catch (err) {
    if (err.response === undefined)
      dispatch(getUserError('Something went wrong'))
    dispatch(getUserError(err.response.data.error))
  }
}

export const deleteUser = () => async (
  dispatch: Dispatch<UserActions, {}, any>
) => {
  dispatch(requestUser())
  try {
    const response = await apiClient().delete(`/user`)
    const { data } = response.data
    dispatch(deletedUser())
    localStorage.removeItem('token')
    return data
  } catch (err) {
    if (err.response === undefined)
      dispatch(getUserError('Something went wrong'))
    dispatch(getUserError(err.response.data.error))
  }
}

export const updateUser = (user: updateUserObjProps): any => async (
  dispatch: Dispatch<UserActions, {}, any>
) => {
  dispatch(requestUser())
  try {
    const response = await apiClient().put(`/user`, objectToFormData(user))
    const { data } = response.data
    dispatch(updatedUser(data))
    dispatch(setUserById(data))
    return new Promise((resolve, reject) => {
      resolve({ success: true })
    })
  } catch (err) {
    console.log(err)
    if (err.response === undefined)
      dispatch(getUserError('Something went wrong'))
    dispatch(getUserError(err.response.data.error))
  }
}

export const requestFollow = (payload: addFollowerObj) => async (
  dispatch: Dispatch<UserActions, {}, any>,
  getState: () => IState
) => {
  dispatch(requestUser())
  try {
    const follow = get(payload, 'follow', true)
    const userId = get(payload, 'userId', '')
    const removeRequest = get(payload, 'removeRequest')
    const myId = getState().user.user._id
    const response = await apiClient().put(
      `/user/${
        follow ? 'request' : removeRequest ? 'removerequest' : 'cancelrequest'
      }/${userId}`
    )
    const { data } = response.data
    if (get(getState(), 'user.getUser._id') === userId) {
      const newUser = Object.assign({}, getState().user.getUser)
      follow
        ? newUser.requested.push(myId)
        : newUser.requested.includes(myId)
        ? newUser.requested.pop(myId)
        : newUser.requested.splice(
            findIndex(newUser.requested, ['_id', myId]),
            1
          )
      dispatch(setUserById(newUser))
    }
    dispatch(updatedUser(data))
    return data
  } catch (err) {
    console.log(err)
    if (err.response === undefined)
      dispatch(getUserError('Something went wrong'))
    dispatch(getUserError(err.response.data.error))
  }
}

export const addFollower = (payload: addFollowerObj) => async (
  dispatch: Dispatch<UserActions, {}, any>,
  getState: () => IState
) => {
  dispatch(requestUser())
  try {
    const follow = get(payload, 'follow', true)
    const userId = get(payload, 'userId', '')
    const myId = getState().user.user._id
    const response = await apiClient().put(
      `/user/${follow ? 'follow' : 'unfollow'}/${userId}`
    )
    const { data } = response.data
    if (get(getState(), 'user.getUser._id') === userId && !follow) {
      const newUser = Object.assign({}, getState().user.getUser)
      newUser.followers.includes(myId)
        ? newUser.followers.pop(myId)
        : newUser.followers.splice(
            findIndex(newUser.followers, ['_id', myId]),
            1
          )
      dispatch(setUserById(newUser))
    } else {
      dispatch(setUserById(data))
    }
    dispatch(updatedUser(data))
    return data
  } catch (err) {
    console.log(err)
    if (err.response === undefined)
      dispatch(getUserError('Something went wrong'))
    dispatch(getUserError(err.response.data.error))
  }
}

export const getUserFeed = () => async (
  dispatch: Dispatch<UserActions, {}, any>
) => {
  dispatch(requestUser())
  try {
    const response = await apiClient().get(`/user/feed`)
    const { data } = response.data
    dispatch(updatedUserFeed(data))
    return data
  } catch (err) {
    if (err.response === undefined)
      dispatch(getUserError('Something went wrong'))
    dispatch(getUserError(err.response.data.error))
  }
}

export type UserActions =
  | requestUserProps
  | userDetailsProps
  | getUserErrorProps
  | getAllUserProps
  | getUserByIdProps
  | deleteUserProps
  | updateUserProps
  | UpdatedUserProps
  | changeThemeProps
  | toggleSnackBarProps
