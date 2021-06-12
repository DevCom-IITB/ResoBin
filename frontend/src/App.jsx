// Node modules
import { Suspense, useContext, useEffect } from 'react'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components'
// Components, hooks and styles
import { GlobalStyles, DarkTheme, LightTheme } from 'styles'
import { AdminView, Login, NotFound, Signup } from 'pages'
import { LoaderAnimation, PrivateRoute, ThemeContext } from 'hoc'
// import alertActions from 'store/actions/alertActions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Setup fake backend
// import { configureFakeBackend } from 'FakeBackend'
// window.BACKEND_URL = 'http://localhost:4000'
// configureFakeBackend()

const App = () => {
  const { theme } = useContext(ThemeContext)
  // const dispatch = useDispatch()
  // const history = useHistory()
  // useEffect(() => {
  //   history.listen(() => {
  //     dispatch(alertActions.clear())
  //   })
  // }, [dispatch, history])

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <GlobalStyles />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Suspense fallback={<LoaderAnimation />}>
        <Switch>
          <PrivateRoute path="/dashboard" component={AdminView} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot-password" component={NotFound} />
          <Route exact path="/404" component={NotFound} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
