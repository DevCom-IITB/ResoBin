import { ThemeProvider } from 'styled-components'
import Dashboard from '@app/containers/Dashboard'
import { GlobalStyles } from '@app/styles/global'
import { darkTheme } from '@app/styles/theme'

const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<GlobalStyles />
			<Dashboard />
		</ThemeProvider>
	)
}

export default App
