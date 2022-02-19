import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',

  initialState: {
    theme: 'device',
    tracking: true,
    isDropdownActive: false,
  },

  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload
    },

    setTracking: (state, { payload }) => {
      state.tracking = payload
    },

    setDropdown: (state, { payload }) => {
      state.isDropdownActive = payload
    },
  },
})

// ? actions
// * same names as that set inside reducers key of createSlice
export const { setTheme, setDropdown, setTracking } = settingsSlice.actions

// ? selectors
// * naming convention: https://twitter.com/_jayphelps/status/739905438116806656
// * avoid using inline selectors
export const selectSettings = (state) => state.settings
export const selectIsDropdownActive = (state) => state.settings.isDropdownActive
export const selectTheme = (state) => {
  const { theme } = state.settings
  if (theme !== 'device') return theme
  if (window.matchMedia?.('(prefers-color-scheme: light)')?.matches)
    return 'light'
  return 'dark'
}

// ? reducer
// * always export reducer as default
export default settingsSlice.reducer
