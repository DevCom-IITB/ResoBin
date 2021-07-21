import { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import { Header } from 'components/header'
import { LoaderAnimation } from 'components/shared'
import { PrivateRoute } from 'hoc'
import { selectTheme } from 'store/settingsSlice'
import { DarkTheme, GlobalStyles, LightTheme } from 'styles'

const Dashboard = lazy(() => import('pages/Dashboard'))
const Login = lazy(() => import('pages/Login'))
const NotFound = lazy(() => import('pages/NotFound'))

const App = () => {
  toast.configure()
  const theme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <Helmet>
        <title>ResoBin</title>
        <meta
          name="description"
          content="IIT Bombay's course resources sharing website"
        />
      </Helmet>
      <Header />

      <GlobalStyles />
      <Suspense fallback={<LoaderAnimation />}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <PrivateRoute path="/" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
