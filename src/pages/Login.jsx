import { Button } from 'antd'
import { lighten } from 'polished'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { LoaderAnimation, PageContainer, toast } from 'components/shared'
import { getLoginURL, SSO } from 'config/sso'
import { CSRFToken } from 'helpers'
import { useQueryString } from 'hooks'
import { getAuthStatusAction, loginAction } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

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
      const error = getQueryString('error')
      const code = getQueryString('code')

      if (code) {
        const params = { code, redir: SSO.BASE_REDIRECT_URI }
        deleteQueryString('code')
        dispatch(loginAction({ params }))
      }

      // ? If SSO login is unsuccessfull, an error param appears in the query string
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

      <Container>
        <BoxContainer>
          <h4>Welcome to ResoBin!</h4>

          <SSOButton type="primary" onClick={redirectLogin}>
            Login with SSO
          </SSOButton>
        </BoxContainer>
      </Container>
    </PageContainer>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.secondary};
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 0;
  background-color: ${({ theme }) => theme.darksecondary};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.75rem rgb(0 0 0 / 40%);

  h4 {
    padding: 0 1.5rem;
    color: ${({ theme }) => theme.textColor};
    font-weight: 300;
    font-size: ${fontSize.responsive.lg};
    letter-spacing: 2px;
    text-align: center;
  }
`

const SSOButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  margin: 1.5rem 1.5rem 0;
  font-weight: 500;
  font-size: 1rem;
  background-color: #303f9f;
  border-color: #303f9f;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${lighten(0.1, '#303f9f')};
    border-color: ${lighten(0.1, '#303f9f')};
  }
`
