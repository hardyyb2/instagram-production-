import { UserProps, ThemeOptions } from './actions/userActions'
import { postProps } from './actions'

export interface IAuth {
  isAuthenticated: boolean | null
  isVerifying: boolean | null
  token: string | null
  loading: boolean
  error: string | null
}

export interface IUser {
  user: null | any
  getUser: null | any
  users: any[] | null
  error: string | null
  loading: boolean
  userFeed: UserProps[] | null
  theme: ThemeOptions
  showSnackBar: boolean
  snackBarMessage: string
}

export interface IPosts {
  loading: boolean
  error: string | null
  myPosts: postProps[] | null
  otherPosts: postProps[] | null
  selectedUserPosts: postProps[] | null
  selectedPost: postProps | null
}

export interface IState {
  auth: IAuth
  user: IUser
  post: IPosts
}
