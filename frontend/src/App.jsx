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
import { LoaderAnimation, PrivateRoute } from 'hoc'

// Setup fake backend
import { configureFakeBackend } from 'FakeBackend'
window.BACKEND_URL = 'http://localhost:4000'
configureFakeBackend()

const AdminView = Loadable({
  loader: () => import('pages/AdminView'),
  loading: LoaderAnimation,
})

const App = () => {
  const { theme } = useContext(ThemeContext)
  // let id = `5`
  // console.log(window.BACKEND_URL + '/users/' + id)
  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <GlobalStyles />
      <Router>
        <Suspense fallback={<LoaderAnimation />}>
          <Switch>
            <PrivateRoute path="/dashboard" component={AdminView} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgot-password" component={NotFound} />
            <Route exact path="/404" component={NotFound} />
            <Redirect from="*" to="/login" />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
