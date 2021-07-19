import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',

  initialState: {
    theme: 'dark',
  },

  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload
    },
  },
})

export const { setTheme } = settingsSlice.actions

export default settingsSlice.reducer
