import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { toastError } from 'components/toast'
import { axiosAuth } from 'helpers'

const initialState = {
  isAuthenticated: false,
  loading: false,
  profile: {},
}

export const loginAction = createAsyncThunk(
  'auth/login',
  async ({ code, redir }) => {
    try {
      return await axiosAuth.get(`/login?code=${code}&redir=${redir}`)
    } catch (error) {
      toastError(error.message)
      return Promise.reject(error)
    }
  }
)

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  try {
    return await axiosAuth.get('/logout')
  } catch (error) {
    toastError(error.message)
    return Promise.reject(error)
  }
})

export const getProfileAction = createAsyncThunk(
  'auth/getProfile',
  async () => {
    try {
      return await axiosAuth.get('/accounts/profile')
    } catch (error) {
      toastError(error.message)
      return Promise.reject(error)
    }
  }
)

// export const checkAuthAction = createAsyncThunk('auth/checkAuth', async () =>
//   axiosAuth.get('/accounts/authenticated')
// )

// export const deleteAccAction = createAsyncThunk(
//   'auth/deleteAcc',
//   async (data) => axiosAuth.delete('/accounts/delete')
// )

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [loginAction.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.isAuthenticated = true
    },
    [loginAction.pending]: (state) => {
      state.loading = true
    },
    [loginAction.rejected]: (state) => {
      state.loading = false
      state.isAuthenticated = false
    },

    [logoutAction.fulfilled]: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
    },
    [logoutAction.pending]: (state) => {
      state.loading = true
    },
    [logoutAction.rejected]: (state) => {
      state.loading = false
      state.isAuthenticated = false
    },

    [getProfileAction.fulfilled]: (state, { payload }) => {
      state.profile = payload.data.profile
      state.loading = false
    },
    [getProfileAction.pending]: (state) => {
      state.loading = true
    },
    [getProfileAction.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const selectUserProfile = (state) => state.auth.profile
export const selectAuthLoading = (state) => state.auth.loading

export default authSlice.reducer
