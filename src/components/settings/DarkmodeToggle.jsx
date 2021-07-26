import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Toggle } from 'components/shared'
// import { useThemeContext } from 'context/ThemeContext'
import { applyTheme, selectTheme } from 'store/settingsSlice'

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`

const DarkmodeToggle = () => {
  // const { theme, toggleTheme } = useThemeContext()
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const toggleTheme = () => {
    if (theme === 'dark') dispatch(applyTheme('light'))
    else if (theme === 'light') dispatch(applyTheme('dark'))
  }

  return (
    <CheckboxContainer>
      <Toggle onClick={toggleTheme} defaultChecked={theme === 'dark'} />
    </CheckboxContainer>
  )
}

export default DarkmodeToggle
