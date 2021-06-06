import { Suspense, useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Loadable from 'react-loadable'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, DarkTheme, LightTheme } from 'styles'
import { ThemeContext } from 'context/ThemeContext'
import { Loader } from 'hoc'

const AdminView = Loadable({
  loader: () => import('pages/AdminView'),
  loading: Loader,
})

const App = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <GlobalStyles />
      <Router basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<Loader />}>
          <AdminView />
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
