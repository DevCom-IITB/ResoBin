import { configureStore } from '@reduxjs/toolkit'
// import alert from 'store/reducers/alert'
import auth from 'store/reducers/auth'
import loadingReducer from 'features/loadingSlice'
import loginReducer from 'features/auth/loginSlice'

const store = configureStore({
  reducer: {
    // alert: alert,
    auth: auth,
    login: loginReducer,
    loading: loadingReducer,
  },
  preloadedState: {},
})

export default store
