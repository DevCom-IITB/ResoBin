import { Suspense, useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, DarkTheme, LightTheme } from 'styles'
import { ThemeContext } from 'context/ThemeContext'
import { AdminView } from 'pages'

const App = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <GlobalStyles />
      <Router basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminView />
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
