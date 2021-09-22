import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { LoginURL, SSO } from 'api'
import { LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
import { CSRFToken } from 'helpers'
import { getAuthStatusAction, loginAction } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    if (isAuthenticated === null) dispatch(getAuthStatusAction())
    if (isAuthenticated) setRedirect('/')

    const queryString = new URLSearchParams(location.search)

    const error = queryString.get('error')
    if (error) {
      toastError(`Error: ${error}`)
      setRedirect('/login')
    }

    const code = queryString.get('code')
    if (code) {
      dispatch(loginAction({ code, redir: SSO.REDIRECT_URI }))
      setRedirect('/login')
    }
  }, [dispatch, location, isAuthenticated])

  if (redirect) return <Redirect to={redirect} />

  const redirectLogin = () => {
    window.location.href = LoginURL
  }

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
