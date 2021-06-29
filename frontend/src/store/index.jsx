import { configureStore } from '@reduxjs/toolkit'
import auth from 'store/reducers/auth'
import loadingReducer from 'features/loadingSlice'
import authReducer from 'features/authSlice'

const store = configureStore({
  reducer: {
    auth: auth,
    // auth: authReducer,
    loading: loadingReducer,
  },
  preloadedState: {},
})

export default store
