import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist'

import {
  // reducer,
  persistedReducer,
} from './combineReducers'

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
})

if (process.env.NODE_ENV === 'development') middleware.push(logger)

export const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV === 'development',
  middleware,
  preloadedState: {},
})

export const persistor = persistStore(store)
