import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { courseListAPI, courseSlotListAPI } from 'api/courses'
import { toastError } from 'components/toast'

// ? async actions
export const getCourseList = createAsyncThunk(
  'course/getCourseList',
  async () => axios.get(courseListAPI)
)

export const getCourseSlots = createAsyncThunk(
  'courses/getCourseSlots',
  async () => axios.get(courseSlotListAPI)
)

// ? reducer
const courseSlice = createSlice({
  name: 'course',

  initialState: {
    list: [],
    slots: [],
    loading: false,
    checksum: '',
    lastUpdated: '',
  },

  reducers: {
    updateChecksum: (state, { payload }) => {
      state.checksum = payload.checksum
      state.lastUpdated = payload.lastUpdated
    },
  },

  extraReducers: {
    [getCourseList.fulfilled]: (state, { payload }) => {
      state.list = payload.data.map((course) => ({
        ...course,
        Code: course.Code.replaceAll(' ', ''),
      }))

      state.loading = false
    },
    [getCourseList.pending]: (state) => {
      state.loading = true
    },
    [getCourseList.rejected]: (state) => {
      state.loading = false
    },

    [getCourseSlots.fulfilled]: (state, { payload }) => {
      state.slots = payload.data.map((course) => ({
        ...course,
        Code: course.Code.replaceAll(' ', ''),
      }))
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
  createSelector(selectCourseList, (courseList) => {
    const matches = courseList.filter((course) => course.Code === courseCode)

    switch (matches.length) {
      case 0:
        toastError(`Course: ${courseCode} does not exist`)
        return null
      case 1:
        return matches[0]
      default:
        toastError(`Multiple matches found for course code: ${courseCode}`)
        return matches[0]
    }
  })

// code: 'CL 152'  ->  slots: ['1A', '1B', '1C']
export const selectCourseSlotsByCourseCode = (courseCode) =>
  createSelector(selectCourseSlots, (courseSlotList) => {
    const matches = courseSlotList.filter(
      (course) => course.Code === courseCode
    )

    switch (matches.length) {
      case 0:
        toastError(`Course: ${courseCode} is not running this semester`)
        return null
      case 1:
        return matches[0].Slot
      default:
        toastError(`Multiple matches found for course code: ${courseCode}`)
        return matches[0].Slot
    }
  })

export default courseSlice.reducer
