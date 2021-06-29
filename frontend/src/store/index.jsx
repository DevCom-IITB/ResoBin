import { configureStore } from '@reduxjs/toolkit'
// import alert from 'store/reducers/alert'
import auth from 'store/reducers/auth'
import loadingReducer from 'features/loadingSlice'
import authReducer from 'features/authSlice'

const store = configureStore({
  reducer: {
    // alert: alert,
    auth: auth,
    login: authReducer,
    loading: loadingReducer,
  },
  preloadedState: {},
})

export default store
