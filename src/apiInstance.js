import axios from 'axios'
import { isEmpty } from 'lodash'

const createAPIInstance = () => {
  const authToken = localStorage.getItem('token')
  const tokenHeader = isEmpty(authToken)
    ? {}
    : {
        Authorization: `Bearer ${authToken}`,
      }

  const api = axios.create({
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/api/v1.1/'
        : '/api/v1.1/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      ...tokenHeader,
    },
  })
  return api
}

export default createAPIInstance
