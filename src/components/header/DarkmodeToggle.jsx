import styled from 'styled-components'

import { Toggle } from 'components/shared'
import { useThemeContext } from 'context/ThemeContext'

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`

const DarkmodeToggle = () => {
  const { theme, toggleTheme } = useThemeContext()
  return (
    <CheckboxContainer>
      <Toggle onClick={toggleTheme} defaultChecked={theme === 'dark'} />
    </CheckboxContainer>
  )
}

export default DarkmodeToggle
