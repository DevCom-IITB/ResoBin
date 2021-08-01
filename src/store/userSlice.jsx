import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

// ? inbuilt support for CRUD
export const favouritesAdapter = createEntityAdapter()
export const timetableAdapter = createEntityAdapter()

// ? reducer
const userSlice = createSlice({
  name: 'user',

  // initialState: {
  //   favourites: [],
  //   timetable: [],
  // },
  initialState: {
    favourites: favouritesAdapter.getInitialState(),
    timetable: timetableAdapter.getInitialState(),
  },

  reducers: {
    addFavourite: favouritesAdapter.addOne,
    removeFavourite: favouritesAdapter.removeOne,

    addCourseToTimetable: timetableAdapter.addOne,
    removeCourseFromTimetable: timetableAdapter.removeOne,
  },
})

// ? actions
export const {
  addFavourite,
  removeFavourite,
  addCourseToTimetable,
  removeCourseFromTimetable,
} = userSlice.actions

// ? selectors
export const selectFavourites = (state) => state.user.favourites
export const selectTimetable = (state) => state.user.favourites

export default userSlice.reducer
