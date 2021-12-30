import { useDispatch, useSelector } from 'react-redux'

import { selectTheme, setTheme } from 'store/settingsSlice'

const useTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const switchTheme = () => {
    if (theme === 'dark') dispatch(setTheme('light'))
    else if (theme === 'light') dispatch(setTheme('dark'))
  }

  return {
    theme,
    switchTheme,
  }
}

export default useTheme
