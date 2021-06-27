import { configureStore } from '@reduxjs/toolkit'
import alert from 'store/reducers/alert'
import auth from 'store/reducers/auth'
import loadingReducer from 'features/loadingSlice'

const store = configureStore({
  reducer: {
    alert: alert,
    auth: auth,
    loading: loadingReducer,
  },
  preloadedState: {},
})

export default store
