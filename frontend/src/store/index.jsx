import { configureStore } from '@reduxjs/toolkit'
import alert from 'store/reducers/alert'
import auth from 'store/reducers/auth'

const initialState = {}

const store = configureStore({
  reducer: {
    alert,
    auth,
  },
  preloadedState: initialState,
})

export default store
