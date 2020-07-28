import { IUser } from '../types'
import { UserActions } from '../actions/userActions'
import {
  REQUEST_USER,
  USER_DETAILS,
  GET_USER_ERROR,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  DELETE_USER,
  UPDATE_USER,
  GET_USER_FEED,
  CHANGE_THEME,
  TOGGLE_SNACKBAR,
} from '../constants'

const initialState: IUser = {
  user: null,
  error: null,
  loading: false,
  users: null,
  getUser: null,
  userFeed: null,
  theme: 'light',
  showSnackBar: false,
  snackBarMessage: '',
}

const reducer = (state: IUser = initialState, action: UserActions) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        loading: true,
      }
    case USER_DETAILS:
      return {
        ...state,
        loading: false,
        user: action.user,
      }
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case GET_ALL_USERS:
      return {
        ...state,
        loading: false,
        users: action.users,
      }

    case GET_USER_BY_ID:
      return {
        ...state,
        loading: false,
        getUser: action.user,
      }
    case DELETE_USER:
      return initialState

    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: action.user,
      }

    case GET_USER_FEED:
      return {
        ...state,
        loading: false,
        userFeed: action.userFeed,
      }

    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      }
    case TOGGLE_SNACKBAR:
      return {
        ...state,
        showSnackBar: !state.showSnackBar,
        snackBarMessage: action.message,
      }
    default:
      return state
  }
}

export default reducer
