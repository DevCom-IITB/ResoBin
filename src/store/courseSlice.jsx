import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// import { axiosAuth } from 'helpers'

export const getCourseList = createAsyncThunk(
  'course/getCourseList',
  async () =>
    axios.get('https://run.mocky.io/v3/f7148570-7766-488e-9239-1360027e35a0')
)

const courseSlice = createSlice({
  name: 'course',

  initialState: {
    list: [],
    loading: false,
  },

  extraReducers: {
    [getCourseList.fulfilled]: (state, { payload }) => {
      state.list = payload.data
      state.loading = false
    },
    [getCourseList.pending]: (state) => {
      state.loading = true
    },
    [getCourseList.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default courseSlice.reducer
