import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './authSlice'
import courseReducer from './courseSlice'
import settingsReducer from './settingsSlice'
import userReducer from './userSlice'

export const reducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  settings: settingsReducer,
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings'],
}

export const persistedReducer = persistReducer(persistConfig, reducer)
