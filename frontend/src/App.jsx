// Node modules
import { Suspense, useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Loadable from 'react-loadable'
import { ThemeProvider } from 'styled-components'

// Components, hooks and styles
import { GlobalStyles, DarkTheme, LightTheme } from 'styles'
import { ThemeContext } from 'context/ThemeContext'
import { Login, NotFound, SignUp } from 'pages'
import { Loader, PrivateRoute } from 'hoc'

// Fake backend
import { configureFakeBackend } from 'fake-backend'
configureFakeBackend()

const AdminView = Loadable({
  loader: () => import('pages/AdminView'),
  loading: Loader,
})

const App = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <GlobalStyles />
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/dashboard" component={AdminView} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/404" component={NotFound} />
            <Redirect from="*" to="/login" />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
