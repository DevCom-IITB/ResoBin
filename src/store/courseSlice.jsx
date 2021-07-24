import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { courseCodeToSlug } from 'paths'

// ? async actions
export const getCourseList = createAsyncThunk(
  'course/getCourseList',
  async () =>
    axios.get('https://run.mocky.io/v3/327e45a5-e2da-4859-b4ad-688cb6328bd1')
)

// ? reducer
const courseSlice = createSlice({
  name: 'course',

  initialState: {
    list: [],
    loading: false,
  },

  reducers: {},

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

// ? selectors
export const selectCourseList = (state) => state.course.list
export const selectCourseAPILoading = (state) => state.course.loading

// https://stackoverflow.com/questions/62545632/how-to-pass-an-additional-argument-to-useselector
export const selectCourseListByCourseCode = (courseCodeParam) =>
  createSelector(selectCourseList, (courseList) =>
    courseList.filter(
      (course) => courseCodeToSlug(course.Code) === courseCodeParam
    )
  )

export default courseSlice.reducer
