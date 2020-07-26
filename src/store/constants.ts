//Auth
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const AUTHENTICATED = 'AUTHENTICATED'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const VERIFY_REQUEST = 'VERIFY_REQUEST'
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'

export type LOGIN_REQUEST = typeof LOGIN_REQUEST
export type AUTHENTICATED = typeof AUTHENTICATED
export type LOGIN_ERROR = typeof LOGIN_ERROR
export type SET_AUTHENTICATED = typeof SET_AUTHENTICATED
export type VERIFY_REQUEST = typeof VERIFY_REQUEST

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const UNAUTHENTICATED = 'UNAUTHENTICATED'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export type LOGOUT_REQUEST = typeof LOGOUT_REQUEST
export type UNAUTHENTICATED = typeof UNAUTHENTICATED
export type LOGOUT_ERROR = typeof LOGOUT_ERROR

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

export type SIGNUP_REQUEST = typeof SIGNUP_REQUEST
export type RECEIVE_SIGNUP = typeof RECEIVE_SIGNUP
export type SIGNUP_ERROR = typeof SIGNUP_ERROR

export const CLEAR_ERROR = 'CLEAR_ERROR'
export type CLEAR_ERROR = typeof CLEAR_ERROR

//User
export const REQUEST_USER = 'REQUEST_USER'
export const USER_DETAILS = 'USER_DETAILS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

export type REQUEST_USER = typeof REQUEST_USER
export type USER_DETAILS = typeof USER_DETAILS
export type GET_USER_ERROR = typeof GET_USER_ERROR

export const GET_ALL_USERS = 'GET_ALL_USERS'
export type GET_ALL_USERS = typeof GET_ALL_USERS

export const GET_USER_BY_ID = 'GET_USER_BY_ID'
export type GET_USER_BY_ID = typeof GET_USER_BY_ID

export const DELETE_USER = 'DELETE_USER'
export type DELETE_USER = typeof DELETE_USER

export const UPDATE_USER = 'UPDATE_USER'
export type UPDATE_USER = typeof UPDATE_USER

export const GET_USER_FEED = 'GET_USER_FEED'
export type GET_USER_FEED = typeof GET_USER_FEED

export const CHANGE_THEME = 'CHANGE_THEME'
export type CHANGE_THEME = typeof CHANGE_THEME

export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR'
export type TOGGLE_SNACKBAR = typeof TOGGLE_SNACKBAR

//POSTS
export const REQUEST_POST = 'REQUEST_POST'
export type REQUEST_POST = typeof REQUEST_POST

export const POST_ERROR = 'POST_ERROR'
export type POST_ERROR = typeof POST_ERROR

export const SUCCESS = 'SUCCESS'
export type SUCCESS = typeof SUCCESS

export const ADD_POST = 'ADD_POST'
export type ADD_POST = typeof ADD_POST

export const RECEIVE_POSTS_BY_ID = 'RECEIVE_POSTS_BY_ID'
export type RECEIVE_POSTS_BY_ID = typeof RECEIVE_POSTS_BY_ID

export const RECEIVE_MY_POSTS = 'RECEIVE_MY_POSTS'
export type RECEIVE_MY_POSTS = typeof RECEIVE_MY_POSTS

export const RECEIVE_POST = 'RECEIVE_POST'
export type RECEIVE_POST = typeof RECEIVE_POST

export const POST_DELETED = 'POST_DELETED'
export type POST_DELETED = typeof POST_DELETED

export const RECEIVED_POST_FEED = 'RECEIVED_POST_FEED'
export type RECEIVED_POST_FEED = typeof RECEIVED_POST_FEED

export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export type ADD_LIKE = typeof ADD_LIKE
export type REMOVE_LIKE = typeof REMOVE_LIKE
export type ADD_COMMENT = typeof ADD_COMMENT
export type REMOVE_COMMENT = typeof REMOVE_COMMENT
