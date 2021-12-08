import { useDispatch, useSelector } from 'react-redux'

import { applyTheme, selectTheme } from 'store/settingsSlice'

const useTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const switchTheme = () => {
    if (theme === 'dark') dispatch(applyTheme('light'))
    else if (theme === 'light') dispatch(applyTheme('dark'))
  }

  return {
    theme,
    switchTheme,
  }
}

export default useTheme
