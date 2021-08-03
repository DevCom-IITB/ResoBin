import { createSlice, createSelector } from '@reduxjs/toolkit'

// ? reducer
const userSlice = createSlice({
  name: 'user',

  initialState: {
    favourites: [],
    timetable: [],
  },

  reducers: {
    // remove favourite if in list else add to list
    updateFavourite({ favourites }, { payload }) {
      const index = favourites.indexOf(payload)
      if (index === -1) favourites.push(payload)
      else favourites.splice(index, 1)
    },

    // params: (state, action)
    updateTimetable({ timetable }, { payload }) {
      const index = timetable.indexOf(payload)
      if (index === -1) timetable.push(payload)
      else timetable.splice(index, 1)
    },
  },
})

// ? actions
export const { updateFavourite } = userSlice.actions

// ? selectors
// * get all favourites
export const selectAllFavourites = (state) => state.user.favourites
export const selectAllTimetable = (state) => state.user.timetable

// * get if a course is a favourite or not
export const selectFavouriteStatus = (courseCode) =>
  createSelector(selectAllFavourites, (favourite) => {
    return favourite.indexOf(courseCode) !== -1
  })

export default userSlice.reducer
