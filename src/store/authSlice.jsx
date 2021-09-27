import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from 'api'

const initialState = {
  isAuthenticated: null,
  loading: false,
  profile: {},
}

export const loginAction = createAsyncThunk('auth/loginAction', API.auth.login)

export const logoutAction = createAsyncThunk(
  'auth/logoutAction',
  API.auth.logout
)

export const getAuthStatusAction = createAsyncThunk(
  'auth/getAuthStatusAction',
  API.auth.authenticate
)

export const deleteProfileAction = createAsyncThunk(
  'auth/deleteProfile',
  API.profile.delete
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
  },
})

export const selectAuthLoading = (state) => state.auth.loading

export default authSlice.reducer
