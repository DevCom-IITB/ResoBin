import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './authSlice'
import courseReducer from './courseSlice'
import settingsReducer from './settingsSlice'

export const reducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  settings: settingsReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

export const persistedReducer = persistReducer(persistConfig, reducer)
