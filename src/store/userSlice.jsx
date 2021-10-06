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

export const deleteProfileAction = createAsyncThunk(
  'user/deleteProfileAction',
  API.profile.delete
)

// ? reducer
const userSlice = createSlice({
  name: 'user',

  initialState: {
    id: null,
    name: null,
    email: null,
    ldapId: null,
    profilePicture: null,
    department: null,
    favoriteCourses: [],
    reviewsWritten: [],
    reviewsRequested: [],
    reviewsVoted: [],
    resourcesPosted: [],
    resourcesRequested: [],
    timetable: {
      autumn: [],
      spring: [],
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

  extraReducers: (builder) => {
    builder
      .addCase(getProfileAction.fulfilled, (state, { payload }) => {
        state.id = payload.id
        state.name = payload.name
        state.email = payload.email
        state.ldapId = payload.ldapId
        state.profilePicture = payload.profilePicture
        state.department = payload.department
        state.favoriteCourses = payload.favoriteCourses
        state.reviewsWritten = payload.reviewsWritten
        state.reviewsRequested = payload.reviewsRequested
        state.reviewsVoted = payload.reviewsVoted
        state.resourcesPosted = payload.resourcesPosted
        state.resourcesRequested = payload.resourcesRequested
        state.loading = false
      })
      // .addCase(getProfileAction.loading, (state) => {
      //   state.loading = true
      // })
      .addCase(getProfileAction.rejected, (state) => {
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('pending'),
        (state) => {
          state.loading = true
        }
      )
  },

  //     // state.profile = {
  //     //   id: payload.id,
  //     //   name: payload.name,
  //     //   email: payload.email,
  //     //   ldap: payload.ldap,
  //     //   picture: payload.profilePicture,
  //     //   department: payload.department,
  //     // }
  //     // state.favoriteCourses = payload.favorite_courses
  //     // state.reviews = {
  //     //   contributed: payload.reviews_written,
  //     //   requested: payload.reviews_requested,
  //     //   voted: payload.reviews_voted,
  //     // }
  //     // state.resources = {
  //     //   contributed: payload.resources_posted,
  //     //   requested: payload.resources_requested,
  //     // }

  //   [updateProfileAction.fulfilled]: (state, { payload }) => {
  //     state = payload
  //     // state.profile = {
  //     //   id: payload.id,
  //     //   name: payload.name,
  //     //   email: payload.email,
  //     //   ldap: payload.ldap,
  //     //   picture: payload.profile_picture,
  //     //   department: payload.department,
  //     // }
  //     // state.favoriteCourses = payload.favorite_courses
  //     // state.reviews = {
  //     //   contributed: payload.reviews_written,
  //     //   requested: payload.reviews_requested,
  //     //   voted: payload.reviews_voted,
  //     // }
  //     // state.resources = {
  //     //   contributed: payload.resources_posted,
  //     //   requested: payload.resources_requested,
  //     // }
  //     state.loading = false
  //   },
  //   [updateProfileAction.pending]: (state) => {
  //     state.loading = true
  //   },
  //   [updateProfileAction.rejected]: (state) => {
  //     state.loading = false
  //   },
  // },
})

// ? actions
export const { updateFavourite, updateTimetable } = userSlice.actions

// ? selectors
// * get all favourites
export const selectUserProfile = (state) => state.user
export const selectUserLoading = (state) => state.user.loading
export const selectFavouriteCourses = (state) => state.user.favoriteCourses
export const selectAllTimetable = (state) => state.user.timetable

// * get if a course is a favourite or not
export const selectFavouriteStatus = (courseCode) =>
  createSelector(
    selectFavouriteCourses,
    (favoriteCourse) => favoriteCourse.indexOf(courseCode) !== -1
  )

export const selectTimetableStatus = ({ courseCode, semester }) =>
  createSelector(
    selectAllTimetable,
    (timetable) => timetable[semester].indexOf(courseCode) !== -1
  )

export default userSlice.reducer
