import { Button } from 'antd'
import { lighten } from 'polished'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { getLoginURL, SSO } from 'api'
import { LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
import { CSRFToken } from 'helpers'
import { useQueryString } from 'hooks'
import { getAuthStatusAction, loginAction } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { deleteQueryString, getQueryString } = useQueryString()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    // * isAuthenticated === true => already authenticated => redirect away from login
    // * isAuthenticated === null => auth status unknown => check with backend server
    // * isAuthenticated === false => not authenticated => check if auth is possible

    if (isAuthenticated) {
      const state = JSON.parse(getQueryString('state')) ?? '/'
      history.replace(state)
    } else if (isAuthenticated === null) {
      dispatch(getAuthStatusAction())
    } else {
      // ? If user is not authenticated
      const error = getQueryString('error')
      const code = getQueryString('code')

      if (code) {
        const params = { code, redir: SSO.BASE_REDIRECT_URI }
        deleteQueryString('code')
        dispatch(loginAction({ params }))
      }

      // ? If SSO login is unsuccessfull, an error param appears in the query string
      if (error) {
        toastError(`Error: ${error}`)
        deleteQueryString('error')
      }
    }
  }, [dispatch, history, getQueryString, deleteQueryString, isAuthenticated])

  const redirectLogin = () => {
    window.location.href = getLoginURL(location.state.from)
  }

  return loading ? (
    <LoaderAnimation fixed />
  ) : (
    <>
      <Helmet>
        <title>Log In - ResoBin</title>
        <meta name="description" content="Login to continue" />
      </Helmet>
      <CSRFToken />

      <PageContainer>
        <BoxContainer>
          <h4>Welcome to ResoBin!</h4>

          <SSOButton type="primary" onClick={redirectLogin}>
            Login with SSO
          </SSOButton>
        </BoxContainer>
      </PageContainer>
    </>
  )
}

export default Login

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 3rem);
  background-color: ${({ theme }) => theme.secondary};
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 0;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.4);

  h4 {
    padding: 0 1.5rem;
    font-size: ${fontSize.responsive.lg};
    font-weight: 300;
    text-align: center;
    letter-spacing: 2px;
    color: ${({ theme }) => theme.textColor};
  }
`

const SSOButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  margin: 1.5rem 1.5rem 0;
  border-color: #303f9f;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: #303f9f;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.3);

  &:hover {
    border-color: ${lighten(0.1, '#303f9f')};
    background-color: ${lighten(0.1, '#303f9f')};
  }
`
