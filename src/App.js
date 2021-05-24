import React from 'react'
import Dashboard from './containers/Dashboard'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/global'
import { darkTheme } from './styles/theme'

const App = () => {
  return (
		<ThemeProvider theme={darkTheme}>
			<GlobalStyles />
			<Dashboard />
		</ThemeProvider>
	)
}

export default App
