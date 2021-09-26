import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'

import { persistedReducer } from './combineReducers'

const middleware = getDefaultMiddleware({
  serializableCheck: false,
})

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
})

if (process.env.NODE_ENV === 'development') middleware.push(logger)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware,
  preloadedState: {},
})

export const persistor = persistStore(store)
