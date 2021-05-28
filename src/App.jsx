import { lazy, Suspense, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, DarkTheme, LightTheme } from '@app/styles'
import { ThemeContext } from '@app/context/ThemeContext'

import Dashboard from '@app/layout/Dashboard'
import Courses from '@app/pages/Courses'
import Contribute from '@app/pages/Contribute'
import NotFound from '@app/pages/NotFound'

// Lazy load the pages when called
// const Courses = lazy(() => import('@app/pages/Courses'))
// const Contribute = lazy(() => import('@app/pages/Contribute'))
// const NotFound = lazy(() => import('@app/pages/NotFound'))
// const Stats = lazy(() => import('./pages/Stats'))

const App = () => {
	const { theme } = useContext(ThemeContext)
	
	return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <Suspense fallback={<Courses />}> */}
      <Switch>
        <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
          <GlobalStyles />
          <Dashboard />
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/contribute" component={Contribute} />
          <Route component={NotFound} status={404} />
        </ThemeProvider>
      </Switch>
      {/* </Suspense> */}
    </Router>
  )
}

export default App
