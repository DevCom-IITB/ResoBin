import { createContext, useContext } from 'react'
import { useLocalStorage } from 'hooks'

export const ThemeContext = createContext({ theme: 'dark' })

export const ThemeContextProvider = ({ children }) => {
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

export const useViewport = () => {
  const { width, height } = useContext(ThemeContext)
  return { width, height }
}
