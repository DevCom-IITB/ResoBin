import { ThemeProvider } from 'styled-components'
import Dashboard from '@app/containers/Dashboard'
import { GlobalStyles, DarkTheme } from '@app/styles'

const App = () => {
	return (
		<ThemeProvider theme={DarkTheme}>
			<GlobalStyles />
			<Dashboard />
		</ThemeProvider>
	)
}

export default App
