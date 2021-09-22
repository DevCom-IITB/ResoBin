import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from 'api'
import { toastError } from 'components/toast'

const initialState = {
  isAuthenticated: null,
  loading: false,
  profile: {},
}

export const loginAction = createAsyncThunk(
  'auth/login',
  async ({ code, redir }) => {
    const params = { code, redir }
    try {
      return await API.accounts.login({ params })
    } catch (error) {
      toastError(error.message)
      return Promise.reject(error)
    }
  }
)

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  try {
    return await API.accounts.logout()
  } catch (error) {
    toastError(error.message)
    return Promise.reject(error)
  }
})

export const getAuthStatusAction = createAsyncThunk(
  'auth/getAuthStatusAction',
  API.accounts.authenticate
)

export const getProfileAction = createAsyncThunk(
  'auth/getProfile',
  async () => {
    try {
      return await API.accounts.getProfile()
    } catch (error) {
      toastError(error.message)
      return Promise.reject(error)
    }
  }
)

export const deleteProfileAction = createAsyncThunk(
  'auth/deleteProfile',
  API.accounts.deleteProfile
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [loginAction.fulfilled]: (state, { payload }) => {
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
      state.isAuthenticated = false
      state.loading = false
    },
    [logoutAction.pending]: (state) => {
      state.loading = true
    },
    [logoutAction.rejected]: (state) => {
      state.loading = false
    },

    [getAuthStatusAction.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = true
      state.loading = false
    },
    [getAuthStatusAction.pending]: (state) => {
      state.loading = true
    },
    [getAuthStatusAction.rejected]: (state) => {
      state.isAuthenticated = false
      state.loading = false
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
