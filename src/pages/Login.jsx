import { Button } from 'antd'
import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { getLoginURL, SSO } from 'api'
import { LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
import { CSRFToken } from 'helpers'
import { getAuthStatusAction, loginAction } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

const Login = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const qs = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )
  const redirect = qs.get('redirect') ?? '/'
  const error = qs.get('error')
  const code = qs.get('code')

  useEffect(() => {
    if (error) {
      toastError(`Error: ${error}`)
      qs.delete('error')

      history.push({
        pathname: location.pathname,
        search: `?${qs.toString()}`,
      })
    }
  }, [error, history, location.pathname, qs])

  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated === null) dispatch(getAuthStatusAction())
  }, [dispatch, isAuthenticated])

  useEffect(() => {
    if (code) {
      const params = {
        code,
        redir: `${SSO.BASE_REDIRECT_URI}?redirect=${redirect}`,
      }
      dispatch(loginAction({ params }))
    }
  }, [dispatch, code, redirect])

  const redirectLogin = () => {
    window.location.href = getLoginURL(redirect)
  }

  if (isAuthenticated) return <Redirect to={redirect} />

  return (
    <>
      <Helmet>
        <title>Log In - ResoBin</title>
        <meta name="description" content="Login to continue" />
      </Helmet>
      <CSRFToken />

      {loading && <LoaderAnimation fixed />}

      <PageContainer>
        <BoxContainer>
          <h4>Login to Your Account</h4>

          <StyledButton type="primary" onClick={redirectLogin}>
            Login with SSO
          </StyledButton>
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

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  margin: 1.5rem 1.5rem 0;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.3);
`
