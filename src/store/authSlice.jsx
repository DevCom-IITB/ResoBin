import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosAuth } from 'helpers'

const initialState = {
  isAuthenticated: false,
  loading: false,
}

export const loginAction = createAsyncThunk(
  'auth/login',
  async ({ code, redir }) => {
    await axiosAuth.get(`/login?code=${code}`)
  }
)

// export const logoutAction = createAsyncThunk('auth/logout', async () => {
//   await axiosAuth.post('/accounts/logout')

//   sessionStorage.removeItem('TOKEN_KEY')
//   localStorage.removeItem('TOKEN_KEY')
// })

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
    },
    [loginAction.pending]: (state) => {
      state.loading = true
    },
    [loginAction.rejected]: (state) => {
      state.loading = false
    },

    // [logoutAction.fulfilled]: (state, action) => {
    //   state.isAuthenticated = true
    //   state.loading = false
    // },
    // [logoutAction.pending]: (state) => {
    //   state.loading = true
    // },
    // [logoutAction.rejected]: (state) => {
    //   state.loading = false
    // },

    // [checkAuthAction.fulfilled]: (state, action) => {
    //   state.isAuthenticated = true
    //   state.loading = false
    // },
    // [checkAuthAction.pending]: (state) => {
    //   state.loading = true
    // },
    // [checkAuthAction.rejected]: (state) => {
    //   state.loading = false
    // },
  },
})

export default authSlice.reducer
