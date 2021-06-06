import { Suspense, useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, DarkTheme, LightTheme } from 'styles'
import { ThemeContext } from 'context/ThemeContext'
import { AdminView, NotFound } from 'pages'
import { Loader, PrivateRoute } from 'hoc'
import { Login } from 'pages'

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
            {/* <PrivateRoute exact path="/app" component={AdminView} /> */}
            {/* <PrivateRoute path="/" component={AdminView} /> */}
            <Route path="/dashboard" component={AdminView} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/404" component={NotFound} />
            <Redirect from="*" to="/login" />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
