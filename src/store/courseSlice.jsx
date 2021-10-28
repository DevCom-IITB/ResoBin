import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { API } from 'api'

// ? async actions
export const getCourseSlots = createAsyncThunk(
  'courses/getCourseSlots',
  async () =>
    axios.get('https://run.mocky.io/v3/108c5a12-32e4-424a-bbc3-98f7ecd983d8')
)

export const getDepartmentList = createAsyncThunk(
  'courses/getDepartmentList',
  API.departments.list
)

export const getSemesterList = createAsyncThunk(
  'courses/getSemesterList',
  API.semesters.list
)

export const getResourceTags = createAsyncThunk(
  'courses/getResourceTags',
  API.resources.tags.list
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
    list: [],
    listMinified: [],
    slots: [],
    loading: false,
    checksum: '',
    lastUpdated: '',
    departments: [],
    semesters: [],
    resources: {
      tags: [],
    },
  },

  reducers: {
    updateChecksum: (state, { payload }) => {
      state.checksum = payload.checksum
      state.lastUpdated = payload.lastUpdated
    },
  },

  extraReducers: {
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

    [getResourceTags.fulfilled]: (state, { payload }) => {
      state.resources = {
        tags: payload,
      }
      state.loading = false
    },
    [getResourceTags.pending]: (state) => {
      state.loading = true
    },
    [getResourceTags.rejected]: (state) => {
      state.loading = false
    },

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

// ? actions
export const { updateChecksum } = courseSlice.actions

// ? selectors
export const selectCourseAPILoading = (state) => state.course.loading
export const selectResourceTags = (state) => state.course.resources.tags
export const selectDepartments = (state) => state.course.departments
export const selectSemesters = (state) => state.course.semesters
export const selectCourseListMinified = (state) => state.course.listMinified

export default courseSlice.reducer
