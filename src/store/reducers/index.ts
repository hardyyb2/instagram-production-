import { combineReducers } from 'redux'

import auth from './authReducer'
import user from './userReducer'
import post from './postReducer'

export default combineReducers({ auth, user, post })
