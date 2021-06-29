import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from 'features/loadingSlice'
import authReducer from 'features/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
  preloadedState: {},
})

export default store
