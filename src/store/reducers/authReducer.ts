import { AuthenticateAction } from '../actions/authActions'
import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  SET_AUTHENTICATED,
  VERIFY_REQUEST,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  RECEIVE_SIGNUP,
  CLEAR_ERROR,
} from '../constants'
import { IAuth } from '../types'

const initialState: IAuth = {
  token: null,
  isAuthenticated: null,
  isVerifying: true,
  loading: false,
  error: null,
}

const reducer = (state: IAuth = initialState, action: AuthenticateAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isVerifying: true,
      }
    case AUTHENTICATED:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        isVerifying: false,
        loading: false,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        isVerifying: false,
        error: action.error,
      }

    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
      }

    case SET_AUTHENTICATED:
      if (action.token) {
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          isVerifying: false,
          token: action.token,
        }
      }
      return {
        ...state,
        isAuthenticated: false,
        isVerifying: false,
        token: null,
        loading: false,
      }

    case LOGOUT_REQUEST:
      return {
        ...state,
        isVerifying: true,
        loading: true,
      }
    case UNAUTHENTICATED: {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isVerifying: false,
        loading: false,
      }
    }
    case LOGOUT_ERROR:
      return {
        ...state,
        isVerifying: false,
        loading: false,
      }
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case RECEIVE_SIGNUP: {
      return {
        ...state,
        loading: false,
      }
    }
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export default reducer
