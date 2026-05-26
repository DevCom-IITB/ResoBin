import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from 'config/api'

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
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state) => {
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = true
      })
      .addCase(loginAction.rejected, (state) => {
        state.loading = false
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isAuthenticated = false
        state.loading = false
      })
      .addCase(logoutAction.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutAction.rejected, (state) => {
        state.loading = false
      })
      .addCase(getAuthStatusAction.fulfilled, (state) => {
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(getAuthStatusAction.pending, (state) => {
        state.loading = true
      })
      .addCase(getAuthStatusAction.rejected, (state) => {
        state.isAuthenticated = false
        state.loading = false
      })
  },
})

export const selectAuthLoading = (state) => state.auth.loading
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated

export default authSlice.reducer
