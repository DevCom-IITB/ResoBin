import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  AuthBoxContainer,
  AuthButton,
  LoaderAnimation,
  PageContainer,
  toast,
} from 'components/shared'
import { getLoginURL, SSO } from 'config/sso'
import { CSRFToken } from 'helpers'
import { useQueryString } from 'hooks'
import { getAuthStatusAction, loginAction } from 'store/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { deleteQueryString, getQueryString } = useQueryString()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    // * isAuthenticated === true => already authenticated => redirect away from login
    // * isAuthenticated === null => auth status unknown => check with backend server
    // * isAuthenticated === false => not authenticated => check if auth is possible

    if (isAuthenticated) {
      const state = JSON.parse(getQueryString('state')) ?? '/'
      navigate(state, { replace: true })
    } else if (isAuthenticated === null) {
      dispatch(getAuthStatusAction())
    } else {
      // ? If user is not authenticated
      const code = getQueryString('code')
      if (code) {
        const loginUser = async (params) => {
          try {
            const response = await dispatch(loginAction({ params }))
            toast({ status: 'success', content: response?.payload?.detail })
          } catch (error) {
            toast({ status: 'error', content: error })
          }
        }

        const params = { code, redir: SSO.BASE_REDIRECT_URI }
        deleteQueryString('code')
        loginUser(params)
      }

      // ? If SSO login is unsuccessfull, an error param appears in the query string
      const error = getQueryString('error')
      if (error) {
        toast({ status: 'error', content: `Error: ${error}` })
        deleteQueryString('error')
      }
    }
  }, [dispatch, navigate, getQueryString, deleteQueryString, isAuthenticated])

  const redirectLogin = () => {
    window.location.href = getLoginURL(location.state?.from)
  }

  if (loading) return <LoaderAnimation fixed />

  return (
    <PageContainer disable={['menu', 'aside', 'footer']}>
      <Helmet>
        <title>Log In - ResoBin</title>
        <meta name="description" content="Login to continue" />
      </Helmet>
      <CSRFToken />

      <AuthBoxContainer>
        <h4>Welcome to ResoBin!</h4>

        <AuthButton color="#303f9f" type="primary" onClick={redirectLogin}>
          Login via SSO
        </AuthButton>
      </AuthBoxContainer>
    </PageContainer>
  )
}

export default Login
