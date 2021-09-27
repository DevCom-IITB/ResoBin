import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

import { API } from 'api'

export const getProfileAction = createAsyncThunk(
  'user/getProfileAction',
  API.profile.read
)

export const updateProfileAction = createAsyncThunk(
  'user/updateProfileAction',
  API.profile.update
)

// ? reducer
const userSlice = createSlice({
  name: 'user',

  initialState: {
    profile: {},
    favoriteCourses: [],
    timetable: {
      autumn: [],
      spring: [],
    },
    reviews: {
      contributed: [],
      requested: [],
      voted: [],
    },
    resources: {
      contributed: [],
      requested: [],
    },
  },

  reducers: {
    // remove favourite if in list else add to list
    updateFavourite(state, { payload }) {
      const index = state.favoriteCourses.indexOf(payload)

      if (index === -1) state.favoriteCourses.push(payload)
      else state.favoriteCourses.splice(index, 1)
    },

    updateTimetable(state, { payload }) {
      const { courseCode, semester } = payload
      const index = state.timetable[semester].indexOf(courseCode)

      if (index === -1) state.timetable[semester].push(courseCode)
      else state.timetable[semester].splice(index, 1)
    },
  },

  extraReducers: {
    [getProfileAction.fulfilled]: (state, { payload }) => {
      state.profile = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        ldap: payload.ldap,
        picture: payload.profile_picture,
        department: payload.department,
      }
      state.favoriteCourses = payload.favorite_courses
      state.reviews = {
        contributed: payload.reviews_written,
        requested: payload.reviews_requested,
        voted: payload.reviews_voted,
      }
      state.resources = {
        contributed: payload.resources_posted,
        requested: payload.resources_requested,
      }
      state.loading = false
    },
    [getProfileAction.pending]: (state) => {
      state.loading = true
    },
    [getProfileAction.rejected]: (state) => {
      state.loading = false
    },
  },
})

// ? actions
export const { updateFavourite, updateTimetable } = userSlice.actions

// ? selectors
// * get all favourites
export const selectUserProfile = (state) => state.user.details
export const selectAllFavourites = (state) => state.user.favoriteCourses
export const selectAllTimetable = (state) => state.user.timetable

// * get if a course is a favourite or not
export const selectFavouriteStatus = (courseCode) =>
  createSelector(
    selectAllFavourites,
    (favoriteCourse) => favoriteCourse.indexOf(courseCode) !== -1
  )

export const selectTimetableStatus = ({ courseCode, semester }) =>
  createSelector(
    selectAllTimetable,
    (timetable) => timetable[semester].indexOf(courseCode) !== -1
  )

export default userSlice.reducer
