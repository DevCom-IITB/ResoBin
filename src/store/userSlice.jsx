import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

import { API } from 'config/api'

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
    timetable: [],
  },

  reducers: {
    // ? remove if present in array else add
    updateFavourite(state, { payload }) {
      const index = state.favoriteCourses.indexOf(payload)
      if (index === -1) state.favoriteCourses.push(payload)
      else state.favoriteCourses.splice(index, 1)
    },

    updateReviewsVoted(state, { payload }) {
      const index = state.reviewsVoted.indexOf(payload)
      if (index === -1) state.reviewsVoted.push(payload)
      else state.reviewsVoted.splice(index, 1)
    },

    updateTimetable(state, { payload }) {
      const index = state.timetable.indexOf(payload)
      if (index === -1) state.timetable.push(payload)
      else state.timetable.splice(index, 1)
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
        state.timetable = payload.timetable
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
})

// ? actions
export const { updateFavourite, updateReviewsVoted, updateTimetable } =
  userSlice.actions

// ? selectors
// * get all favourites
export const selectUserProfile = (state) => state.user
export const selectUserLoading = (state) => state.user.loading
export const selectFavouriteCourses = (state) => state.user.favoriteCourses
export const selectReviewsVoted = (state) => state.user.reviewsVoted
export const selectAllTimetable = (state) => state.user.timetable

// * get if a course is a favourite or not
export const selectFavouriteStatus = (code) =>
  createSelector(
    selectFavouriteCourses,
    (course) => course.indexOf(code) !== -1
  )

// * get if a course review is voted or not by the user
export const selectReviewVoteStatus = (id) =>
  createSelector(selectReviewsVoted, (review) => review.indexOf(id) !== -1)

export default userSlice.reducer
