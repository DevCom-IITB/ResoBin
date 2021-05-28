import { createContext, useState, useContext } from 'react'

export const ThemeContext = createContext({ theme: 'dark' })

//Custom hook
export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (context === undefined)
    throw new Error('useThemeContext must be used within a ThemeProvider')
  return context
}

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
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