import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosAuth } from 'helpers/axiosAuth'
// import { axios as axiosAuth } from 'axios'

const initialState = {
  isAuthenticated: false,
  loading: false,
}

export const loginAction = createAsyncThunk(
  'auth/login',
  async ({ rememberMe, ...data }) => {
    await axiosAuth.post('/accounts/login', data)
    // rememberMe
    //   ? localStorage.setItem('TOKEN_KEY', 'token')
    //   : sessionStorage.setItem('TOKEN_KEY', 'token')
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loginAction.fulfilled]: (state, action) => {
      state.isAuthenticated = true
      state.loading = false
    },
    [loginAction.pending]: (state, action) => {
      state.loading = true
    },
    [loginAction.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default authSlice.reducer
