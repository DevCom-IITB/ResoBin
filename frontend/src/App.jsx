import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Route, Redirect, Switch } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, DarkTheme, LightTheme } from 'styles'
import { AdminView, Login, NotFound, Signup } from 'pages'
import { PrivateRoute } from 'hoc'
import { ThemeContext } from 'context'

const App = () => {
  const { theme } = useContext(ThemeContext)
  toast.configure()

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <Helmet>
        <title>ResoBin</title>
        <meta
          name="description"
          content="IIT Bombay's course resources sharing website"
        />
      </Helmet>

      <GlobalStyles />
      <Switch>
        <PrivateRoute path="/dashboard" component={AdminView} />
        {/* <PrivateRoute path="/courses/:id" component={NotFound} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={NotFound} />
        <Route exact path="/404" component={NotFound} />
        <Redirect from="*" to="/login" />
      </Switch>
    </ThemeProvider>
  )
}

export default App
