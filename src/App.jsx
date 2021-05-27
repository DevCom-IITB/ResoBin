import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Dashboard from '@app/layout/Dashboard'
import { GlobalStyles, DarkTheme } from '@app/styles'
import NotFound from '@app/pages/NotFound'

// const Courses = lazy(() => import('./pages/About'))
// const Contact = lazy(() => import('./pages/Contact'))
// const Index = lazy(() => import('./pages/Index'))
// const NotFound = lazy(() => import('./pages/NotFound'))
// const Projects = lazy(() => import('./pages/Projects'))
// const Resume = lazy(() => import('./pages/Resume'))
// const Stats = lazy(() => import('./pages/Stats'))

const { PUBLIC_URL } = process.env;

const App = () => {
	return (
    <BrowserRouter basename={PUBLIC_URL}>
      <ThemeProvider theme={DarkTheme}>
        <GlobalStyles />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/courses" component={Dashboard} />
        <Route exact path="/contribute" component={Dashboard} />
        <Route component={NotFound} status={404} />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
