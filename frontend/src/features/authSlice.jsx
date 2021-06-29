import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toastSuccess, toastError } from 'components/toast'

const initialState = {
  isAuthenticated: false,
  loading: false,
  // response: {
  //   status:'',
  //   message:'',
  // }
}

const login = createAsyncThunk('auth/login', async (task) => {
  await axios.post('/accounts/login', task)
  // const response =
  // return response
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      toastSuccess('Login succesful')
      state.isAuthenticated = true
      state.loading = false
    },
    [login.pending]: (state, action) => {
      toastError('Login pending')
      state.loading = true
    },
    [login.rejected]: (state, action) => {
      // toastError(response.data.error)
      toastError(JSON.stringify(action.payload))
      state.loading = false
    },
  },
})

export const { loginUser } = authSlice.actions

export default authSlice.reducer
