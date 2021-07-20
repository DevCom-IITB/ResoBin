import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { Header } from 'components/header'
import { LoginBody } from 'components/login'
import { LoaderAnimation } from 'components/shared'
import { CSRFToken } from 'helpers'
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
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.4);
`

const TitleHeader = styled.h4`
  font-size: ${fontSize.responsive.lg};
  font-weight: 300;
  text-align: center;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.textColor};
`

const validCheck = (data) => {
  let flg = true
  Object.values(data).forEach((val) => {
    if (!val) flg = false
  })
  return flg
}

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  if (isAuthenticated) return <Redirect to="/" />

  const handleChange = ({ target }) =>
    setUser({ ...user, [target.name]: target.value })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validCheck(user)) dispatch(loginAction(user))
  }

  return (
    <>
      <Helmet>
        <title>Log In - ResoBin</title>
        <meta name="description" content="Login to continue" />
      </Helmet>
      <CSRFToken />

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
        </FormBox>
      </Container>
    </>
  )
}

export default Login
