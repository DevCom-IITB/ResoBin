import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Header } from 'components/header'
import { LoaderAnimation } from 'components/shared'
import { SignupBody } from 'components/signup'
import { CSRFToken } from 'helpers'
import { signupAction } from 'store/authSlice'
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

const StyledLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 400;
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

const initialState = {
  fullname: '',
  username: '',
  email: '',
  password: '',
  passwordAgain: '',
}

const validCheck = (data) => {
  let flg = true

  Object.values(data).forEach((val) => {
    if (!val) flg = false
  })
  if (data.password !== data.passwordAgain) flg = false

  return flg
}

const Signup = () => {
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  const handleChange = ({ target }) =>
    setUser({ ...user, [target.name]: target.value })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validCheck(user)) dispatch(signupAction(user))
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <>
      {loading && <LoaderAnimation fixed />}
      <Helmet>
        <title>Sign Up - ResoBin</title>
        <meta
          name="description"
          content="Signup if you don't have an account yet"
        />
      </Helmet>
      <CSRFToken />

      <Header button="Login" buttonLink="/login" />

      <Container>
        <FormBox>
          <TitleHeader>Create an Account</TitleHeader>
          <SignupBody
            onChange={handleChange}
            onSubmit={handleSubmit}
            user={user}
          />
          <StyledLink to="/login">Already have an account? Login!</StyledLink>
        </FormBox>
      </Container>
    </>
  )
}

export default Signup
