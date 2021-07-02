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

import { ThemeContextProvider } from 'context/combineReducers';
import { ContextProvider2 } from '.../Context2';
import { ContextProvider3 } from '.../Context3';
import { ContextProvider4 } from '.../Context4';
import { combineComponents } from 'context/CombineContexts;

const providers = [
  ThemeContextProvider,
  ContextProvider2,
  ContextProvider3,
  ContextProvider4
]

export const ContextProvider = combineComponents(...providers);