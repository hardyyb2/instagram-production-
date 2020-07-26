import { PostActions } from '../actions/postActions'

import {
  REQUEST_POST,
  POST_ERROR,
  ADD_POST,
  RECEIVE_POSTS_BY_ID,
  RECEIVE_MY_POSTS,
  RECEIVE_POST,
  POST_DELETED,
  RECEIVED_POST_FEED,
  SUCCESS,
} from '../constants'
import { IPosts } from '../types'

const initialState: IPosts = {
  loading: false,
  error: null,
  myPosts: null,
  otherPosts: null,
  selectedUserPosts: null,
  selectedPost: null,
}

const reducer = (state: IPosts = initialState, action: PostActions) => {
  switch (action.type) {
    case REQUEST_POST:
      return {
        ...state,
        loading: true,
      }
    case POST_ERROR:
      return {
        ...state,
        loading: false,
      }
    case SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case ADD_POST:
      return {
        ...state,
        loading: false,
      }
    case RECEIVE_POSTS_BY_ID:
      return {
        ...state,
        loading: false,
        selectedUserPosts: action.data,
      }
    case RECEIVE_MY_POSTS:
      return {
        ...state,
        loading: false,
        myPosts: action.data,
      }
    case RECEIVE_POST:
      return {
        ...state,
        loading: false,
        selectedPost: action.data,
      }
    case POST_DELETED:
      return {
        ...state,
        loading: false,
      }
    case RECEIVED_POST_FEED:
      return {
        ...state,
        loading: false,
        otherPosts: action.data,
      }

    default:
      return state
  }
}

export default reducer
