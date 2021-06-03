import { lazy, Suspense, useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, DarkTheme, LightTheme } from 'styles'
import { ThemeContext } from 'context/ThemeContext'
import Dashboard from 'layout/Dashboard'
import { Login, NotFound } from 'pages'

// Lazy load the pages when called
const Courses = lazy(() => import('pages/Courses'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))

const App = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <Router basename={process.env.PUBLIC_URL}>
        <GlobalStyles />
        <Dashboard />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/contribute" component={Contribute} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} status={404} />
            <Redirect to="/404" />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
