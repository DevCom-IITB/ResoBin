import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { selectTheme } from 'store/settingsSlice'
import { palette } from 'styles/utils'

const useColorPicker = () => {
  const theme = useSelector(selectTheme)
  const paletteTheme = palette[theme]

  const randomizeId = useMemo(
    () => Math.floor(Math.random() * paletteTheme.length),
    [paletteTheme.length]
  )

  if (!paletteTheme) {
    throw new Error(`No palette theme found for ${theme}`)
  }

  const colorPicker = (id = randomizeId) =>
    paletteTheme[id % paletteTheme.length]

  return colorPicker
}

export default useColorPicker
