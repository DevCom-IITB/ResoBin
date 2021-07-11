import { useThemeContext } from 'context/ThemeContext'
import { PrivateRoute } from 'hoc'
import { Dashboard, Login, NotFound, Signup } from 'pages'
import { Helmet } from 'react-helmet-async'
import { Redirect, Route, Switch } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { DarkTheme, GlobalStyles, LightTheme } from 'styles'

const App = () => {
  const { theme } = useThemeContext()
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
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/courses/:id" component={NotFound} />
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
