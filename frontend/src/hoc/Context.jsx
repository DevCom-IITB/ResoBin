import { createContext } from 'react'
import { useLocalStorage } from 'hooks'

export const ThemeContext = createContext({ theme: 'dark' })

export const ContextProvider = ({ children }) => {
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
