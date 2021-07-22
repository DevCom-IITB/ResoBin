import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',

  initialState: {
    theme: 'dark',
  },

  reducers: {
    applyTheme: (state, { payload }) => {
      state.theme = payload
    },
  },
})

// ? actions
// * same names as that set inside reducers key of createSlice
export const { applyTheme } = settingsSlice.actions

// ? selectors
// * naming convention: https://twitter.com/_jayphelps/status/739905438116806656
// * avoid using inline selectors
export const selectTheme = (state) => state.settings.theme

// ? reducer
// * always export reducer as default
export default settingsSlice.reducer
