import { useLocalStorage } from 'hooks'
import { createContext, useContext } from 'react'

const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')
  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
