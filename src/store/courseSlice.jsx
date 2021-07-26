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
    search: '',
    checksum: '',
    lastUpdated: '',
  },

  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload
    },

    updateChecksum: (state, { payload }) => {
      state.checksum = payload.checksum
      state.lastUpdated = payload.lastUpdated
    },
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

// ? actions
export const { setSearch, updateChecksum } = courseSlice.actions

// ? selectors
export const selectCourseList = (state) => state.course.list
export const selectCourseAPILoading = (state) => state.course.loading
export const selectCourseSearch = (state) => state.course.search
export const selectChecksum = (state) => state.course.checksum

// https://stackoverflow.com/questions/62545632/how-to-pass-an-additional-argument-to-useselector
export const selectCourseListByCourseCode = (courseCodeParam) =>
  createSelector(selectCourseList, (courseList) =>
    courseList.filter(
      (course) => courseCodeToSlug(course.Code) === courseCodeParam
    )
  )

export default courseSlice.reducer
