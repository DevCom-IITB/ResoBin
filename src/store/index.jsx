import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from 'store/authSlice'
import courseReducer from 'store/courseSlice'

const reducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
})

if (process.env.NODE_ENV === 'development') middleware.push(logger)

const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV === 'development',
  middleware,
  preloadedState: {},
})

export default store
