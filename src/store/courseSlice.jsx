import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCourseList = createAsyncThunk(
  'course/getCourseList',
  async () =>
    axios.get('https://run.mocky.io/v3/327e45a5-e2da-4859-b4ad-688cb6328bd1')
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
