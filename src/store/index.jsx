import { configureStore } from '@reduxjs/toolkit'

import authReducer from 'store/authSlice'
import courseReducer from 'store/courseSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },

  preloadedState: {},
})

export default store
