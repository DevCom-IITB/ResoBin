import { lazy, Suspense, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, DarkTheme, LightTheme } from '@app/styles'
import { ThemeContext } from '@app/context/ThemeContext'

import Dashboard from '@app/layout/Dashboard'

// Lazy load the pages when called
const Courses = lazy(() => import('@app/pages/Courses'))
const Contribute = lazy(() => import('@app/pages/Contribute'))
const NotFound = lazy(() => import('@app/pages/NotFound'))

const App = () => {
	const { theme } = useContext(ThemeContext)
	
	return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalStyles />
          <Dashboard />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/contribute" component={Contribute} />
            <Route component={NotFound} status={404} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
	
}

export default App
