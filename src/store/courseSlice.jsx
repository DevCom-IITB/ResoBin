import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'

import { API } from 'config/api'

// ? async actions
export const getDepartmentList = createAsyncThunk(
  'courses/getDepartmentList',
  API.departments.list
)

export const getSemesterList = createAsyncThunk(
  'courses/getSemesterList',
  API.semesters.list
)

export const getCourseListMinified = createAsyncThunk(
  'courses/getCourseListMinified',
  () =>
    API.courses.list({
      params: { fields: 'code,title', page_size: 0 },
    })
)

// ? reducer
const courseSlice = createSlice({
  name: 'course',

  initialState: {
    listMinified: [],
    loading: false,
    departments: [],
    semesters: [],
  },

  extraReducers: {
    [getDepartmentList.fulfilled]: (state, { payload }) => {
      state.departments = payload
      state.loading = false
    },
    [getDepartmentList.pending]: (state) => {
      state.loading = true
    },
    [getDepartmentList.rejected]: (state) => {
      state.loading = false
    },

    [getSemesterList.fulfilled]: (state, { payload }) => {
      state.semesters = payload?.reverse()
      state.loading = false
    },
    [getSemesterList.pending]: (state) => {
      state.loading = true
    },
    [getSemesterList.rejected]: (state) => {
      state.loading = false
    },

    [getCourseListMinified.fulfilled]: (state, { payload }) => {
      state.listMinified = payload
      state.loading = false
    },
    [getCourseListMinified.pending]: (state) => {
      state.loading = true
    },
    [getCourseListMinified.rejected]: (state) => {
      state.loading = false
    },
  },
})

// ? selectors
export const selectCourseAPILoading = (state) => state.course.loading
export const selectCourseListMinified = (state) => state.course.listMinified
export const selectDepartments = (state) => state.course.departments
export const selectSemesters = (state) => state.course.semesters

export const selectCourseTitle = (code) =>
  createSelector(
    selectCourseListMinified,
    (courseListMinified) =>
      courseListMinified.find((course) => course.code === code)?.title ?? ''
  )

export const selectCurrentSemester = createSelector(
  selectSemesters,
  (semesters) => semesters.at(-1)
)

export default courseSlice.reducer
