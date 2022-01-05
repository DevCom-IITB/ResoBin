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

      <Container>
        <BoxContainer>
          <h4>Welcome to ResoBin!</h4>

          <SSOButton type="primary" onClick={redirectLogin}>
            Login via SSO
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
  height: calc(100vh - ${({ theme }) => theme.headerHeight});
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  padding: 1.5rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.75rem rgb(0 0 0 / 40%);
  color: ${({ theme }) => theme.textColor};

  h4 {
    font-weight: 400;
    font-size: ${fontSize.responsive.lg};
  }
`

const SSOButton = styled(Button)`
  height: 2.5rem;
  font-size: ${fontSize.responsive.sm};
  background-color: #303f9f;
  border-color: #303f9f;
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    background-color: ${lighten(0.1, '#303f9f')};
    border-color: ${lighten(0.1, '#303f9f')};
  }
`
