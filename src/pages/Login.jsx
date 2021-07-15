import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Header } from 'components/header'
import { LoginBody } from 'components/login'
import { LoaderAnimation } from 'components/shared'
import { loginAction } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 3rem);
  background-color: ${({ theme }) => theme.secondary};
`

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.4);
`

const TitleHeader = styled.h4`
  font-weight: 300;
  font-size: ${fontSize.responsive.lg};
  text-align: center;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.textColor};
`

const StyledLink = styled(Link)`
  font-weight: 400;
  font-size: 0.875rem;
  text-align: center;
  text-decoration: none;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1px;
    color: ${({ theme }) => theme.textColor};
  }
`

const validCheck = (data) => {
  let flg = true
  Object.values(data).forEach((val) => {
    if (!val) flg = false
  })
  return flg
}

const Login = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  })

  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  const handleChange = ({ target }) =>
    setUser({ ...user, [target.name]: target.value })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validCheck(user)) dispatch(loginAction(user))
  }

  const history = useHistory()
  if (isAuthenticated) history.push('/dashboard')

  return (
    <>
      <Helmet>
        <title>Log In - ResoBin</title>
        <meta name="description" content="Login to continue" />
      </Helmet>

      {loading && <LoaderAnimation />}

      <Header />

      <Container>
        <FormBox>
          <TitleHeader>Login to Your Account</TitleHeader>

          <LoginBody
            onChange={handleChange}
            onSubmit={handleSubmit}
            user={user}
          />

          <StyledLink to="/signup">
            Don&rsquo;t have an account? Sign up!
          </StyledLink>
        </FormBox>
      </Container>
    </>
  )
}

export default Login
