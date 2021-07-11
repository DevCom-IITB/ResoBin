import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosAuth } from 'helpers'

const initialState = {
  isAuthenticated: false,
  loading: false,
}

export const loginAction = createAsyncThunk('auth/login', async (data) => {
  await axiosAuth.post('/accounts/login', data)
  // rememberMe
  //   ? localStorage.setItem('TOKEN_KEY', 'token')
  //   : sessionStorage.setItem('TOKEN_KEY', 'token')
})

export const signupAction = createAsyncThunk('auth/signup', async (data) =>
  axiosAuth.post('/accounts/signup', data)
)

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  await axiosAuth.post('/accounts/logout')

  sessionStorage.removeItem('TOKEN_KEY')
  localStorage.removeItem('TOKEN_KEY')
})

export const checkAuthAction = createAsyncThunk('auth/checkAuth', async () =>
  axiosAuth.get('/accounts/authenticated')
)

export const deleteAccAction = createAsyncThunk(
  'auth/deleteAcc',
  async (data) => axiosAuth.delete('/accounts/delete')
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [signupAction.fulfilled]: (state, action) => {
      state.isAuthenticated = true
      state.loading = false
    },
    [signupAction.pending]: (state) => {
      state.loading = true
    },
    [signupAction.rejected]: (state) => {
      state.loading = false
    },

    [loginAction.fulfilled]: (state, action) => {
      state.isAuthenticated = true
      state.loading = false
    },
    [loginAction.pending]: (state) => {
      state.loading = true
    },
    [loginAction.rejected]: (state) => {
      state.loading = false
    },

    [logoutAction.fulfilled]: (state, action) => {
      state.isAuthenticated = true
      state.loading = false
    },
    [logoutAction.pending]: (state) => {
      state.loading = true
    },
    [logoutAction.rejected]: (state) => {
      state.loading = false
    },

    [checkAuthAction.fulfilled]: (state, action) => {
      state.isAuthenticated = true
      state.loading = false
    },
    [checkAuthAction.pending]: (state) => {
      state.loading = true
    },
    [checkAuthAction.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default authSlice.reducer
