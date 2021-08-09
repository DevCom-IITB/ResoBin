import { createSlice, createSelector } from '@reduxjs/toolkit'

// ? reducer
const userSlice = createSlice({
  name: 'user',

  initialState: {
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
})

// ? actions
export const { updateFavourite, updateTimetable } = userSlice.actions

// ? selectors
// * get all favourites
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
