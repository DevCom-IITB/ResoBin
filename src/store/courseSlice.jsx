import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { courseCodeToSlug } from 'paths'

// ? async actions
export const getCourseList = createAsyncThunk(
  'course/getCourseList',
  async () =>
    axios.get('https://run.mocky.io/v3/327e45a5-e2da-4859-b4ad-688cb6328bd1')
)

export const getCourseSlots = createAsyncThunk(
  'courses/getCourseSlots',
  async () =>
    axios.get('https://run.mocky.io/v3/2f78426f-0704-48e3-89a1-c1487f2c8a2a')
)

// ? reducer
const courseSlice = createSlice({
  name: 'course',

  initialState: {
    list: [],
    loading: false,
    checksum: '',
    lastUpdated: '',
    slots: [],
  },

  reducers: {
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

    [getCourseSlots.fulfilled]: (state, { payload }) => {
      state.slots = payload.data
      state.loading = false
    },
    [getCourseSlots.pending]: (state) => {
      state.loading = true
    },
    [getCourseSlots.rejected]: (state) => {
      state.loading = false
    },
  },
})

// ? actions
export const { updateChecksum } = courseSlice.actions

// ? selectors
export const selectCourseList = (state) => state.course.list
export const selectCourseAPILoading = (state) => state.course.loading
export const selectChecksum = (state) => state.course.checksum
export const selectCourseSlots = (state) => state.course.slots

// https://stackoverflow.com/questions/62545632/how-to-pass-an-additional-argument-to-useselector
export const selectCourseListByCourseCode = (courseCode) =>
  createSelector(selectCourseList, (courseList) =>
    courseList.filter((course) => courseCodeToSlug(course.Code) === courseCode)
  )

// code: 'CL 152'  ->  slots: ['1A', '1B', '1C']
export const selectCourseSlotsByCourseCode = (courseCode) =>
  createSelector(selectCourseSlots, (courseSlotList) => {
    const results = courseSlotList.filter(
      (course) => course.Code === courseCode
    )
    if (results.length === 1) return results[0].Slot

    console.log('Multiple matches found for course code:', courseCode)
    if (Array.isArray(results[0].Slot)) return results[0].Slot
    return [results[0].Slot]
  })

export default courseSlice.reducer
