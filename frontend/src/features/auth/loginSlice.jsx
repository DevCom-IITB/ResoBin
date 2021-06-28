import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  // response: {
  //   status:'',
  //   message:'',
  // }
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { loginUser } = loginSlice.actions

export default loginSlice.reducer
