import { ThunkDispatch as Dispatch } from 'redux-thunk'
import apiClient from '../../apiInstance'
import { get } from 'lodash'

import * as constants from '../constants'

export interface IAuthenticate {
  type: constants.AUTHENTICATED
  token: string | null
}

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATED
}

export interface loginUserProps {
  email: string
  password: string
}

export interface RequestLoginProps {
  type: constants.LOGIN_REQUEST
}

export interface LoginErrorProps {
  type: constants.LOGIN_ERROR
  error: string | null
}

export interface RequestLogoutProps {
  type: constants.LOGOUT_REQUEST
}

export interface LogoutErrorProps {
  type: constants.LOGOUT_ERROR
  error: string | null
}

export interface SetAuthProps {
  type: constants.SET_AUTHENTICATED
  token: string | null
}

export interface VerifyProps {
  type: constants.VERIFY_REQUEST
}

export interface SignupProps {
  type: constants.SIGNUP_REQUEST
}

export interface ReceiveSignupProps {
  type: constants.RECEIVE_SIGNUP
}

export interface SignupErrorProps {
  type: constants.SIGNUP_ERROR
  error: string | null
}

export interface SignupUserProps {
  email: string
  password: string
  username: string
}

interface clearErrorProps {
  type: constants.CLEAR_ERROR
}

export const requestVerify = (): VerifyProps => {
  return {
    type: constants.VERIFY_REQUEST,
  }
}

export const verifySuccess = (token: string | null): SetAuthProps => {
  return {
    type: constants.SET_AUTHENTICATED,
    token,
  }
}

export const requestLogin = (): RequestLoginProps => {
  return {
    type: constants.LOGIN_REQUEST,
  }
}

export const authenticated = (token: string | null): IAuthenticate => {
  return {
    type: constants.AUTHENTICATED,
    token,
  }
}

export const loginError = (error: string | null): LoginErrorProps => {
  return {
    type: constants.LOGIN_ERROR,
    error,
  }
}

export const requestLogout = (): RequestLogoutProps => {
  return {
    type: constants.LOGOUT_REQUEST,
  }
}

export const unauthenticated = (): IUnauthenticate => {
  return {
    type: constants.UNAUTHENTICATED,
  }
}

export const logoutError = (error: string): LogoutErrorProps => {
  return {
    type: constants.LOGOUT_ERROR,
    error,
  }
}

export const signupRequest = (): SignupProps => {
  return {
    type: constants.SIGNUP_REQUEST,
  }
}

export const receiveSignup = (): ReceiveSignupProps => {
  return {
    type: constants.RECEIVE_SIGNUP,
  }
}

export const signupError = (error: string): SignupErrorProps => {
  return {
    type: constants.SIGNUP_ERROR,
    error,
  }
}

export const clearError = (): clearErrorProps => {
  return {
    type: constants.CLEAR_ERROR,
  }
}

export const signupUser = (user: SignupUserProps) => async (
  dispatch: Dispatch<AuthenticateAction, {}, any>
) => {
  dispatch(signupRequest())
  try {
    const response = await apiClient().post('/auth/signup', user)
    const sucess = get(response, 'success', {})
    if (sucess) dispatch(receiveSignup())
    return new Promise((resolve, reject) => {
      resolve({ success: true })
    })
  } catch (err) {
    console.log(err)
    if (err.response === undefined) {
      dispatch(signupError('Something went wrong'))
    } else dispatch(signupError(err.response.data.error))
  }
}

export const loginUser = (user: loginUserProps) => async (
  dispatch: Dispatch<AuthenticateAction, {}, any>
) => {
  dispatch(requestLogin())
  try {
    const response = await apiClient().post('/auth/login', user)
    const { data: token } = response.data
    localStorage.setItem('token', token)
    dispatch(authenticated(token))
    return token
  } catch (err) {
    if (err.response === undefined) {
      dispatch(signupError('Something went wrong'))
    } else dispatch(loginError(err.response.data.error))
  }
}

export const logoutUser = () => async (
  dispatch: Dispatch<AuthenticateAction, {}, any>
) => {
  dispatch(requestLogin())
  //for now just clear the jwt token from localstorage, later add blacklist on server
  // localStorage.removeItem('token')
  localStorage.clear()
  dispatch(unauthenticated())
}

export const setAuthenticated = (token: string | null) => async (
  dispatch: Dispatch<AuthenticateAction, {}, any>
) => {
  dispatch(requestVerify())
  dispatch(verifySuccess(token))
}
export type AuthenticateAction =
  | IAuthenticate
  | IUnauthenticate
  | RequestLoginProps
  | RequestLogoutProps
  | LoginErrorProps
  | LogoutErrorProps
  | SetAuthProps
  | VerifyProps
  | SignupErrorProps
  | SignupProps
  | ReceiveSignupProps
  | clearErrorProps
