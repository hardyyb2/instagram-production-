import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers/index'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const persistConfig = {
  key: 'instagram',
  storage: storage,
  whitelist: ['user', 'auth', 'post'],
}

const pReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore() {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose
  const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, logger))

  const store = createStore(pReducer, enhancer)
  persistStore(store)
  return store
}
