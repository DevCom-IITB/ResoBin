import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

import { API } from 'api'

export const getProfileAction = createAsyncThunk(
  'user/getProfileAction',
  API.profile.read
)

// ? reducer
const userSlice = createSlice({
  name: 'user',

  initialState: {
    details: {},
    favourites: [],
    timetable: {
      autumn: [],
      spring: [],
    },
  },

  reducers: {
    // remove favourite if in list else add to list
    updateFavourite(state, { payload }) {
      const index = state.favourites.indexOf(payload)

      if (index === -1) state.favourites.push(payload)
      else state.favourites.splice(index, 1)
    },

    // params: (state, action)
    updateTimetable(state, { payload }) {
      const { courseCode, semester } = payload
      const index = state.timetable[semester].indexOf(courseCode)

      if (index === -1) state.timetable[semester].push(courseCode)
      else state.timetable[semester].splice(index, 1)
    },
  },

  extraReducers: {
    [getProfileAction.fulfilled]: (state, { payload }) => {
      state.favourites = payload.data.favorite_courses
      state.details = payload.data
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
export const selectAllFavourites = (state) => state.user.favourites
export const selectAllTimetable = (state) => state.user.timetable

// * get if a course is a favourite or not
export const selectFavouriteStatus = (courseCode) =>
  createSelector(
    selectAllFavourites,
    (favourite) => favourite.indexOf(courseCode) !== -1
  )

export const selectTimetableStatus = ({ courseCode, semester }) =>
  createSelector(
    selectAllTimetable,
    (timetable) => timetable[semester].indexOf(courseCode) !== -1
  )

export default userSlice.reducer
