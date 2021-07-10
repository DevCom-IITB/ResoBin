import Navbar from 'components/navbar'
import { LoaderAnimation } from 'components/shared'
import { SignupBody } from 'components/signup'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { signupAction } from 'store/authSlice'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem);
  background-color: ${({ theme }) => theme.secondary};
`

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 480px;
  padding: 2.5rem 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.4);
`

const TitleHeader = styled.h4`
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
  letter-spacing: 4px;
  color: ${({ theme }) => theme.textColor};
`

const StyledLink = styled(Link)`
  font-weight: 300;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
  user-select: none;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
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

  data.forEach((key) => {
    if (!data[key]) flg = false
  })

  if (data.password !== data.passwordAgain) flg = false

  return flg
}

const Signup = () => {
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  // Change name to id if error occurs
  const handleChange = ({ target }) =>
    setUser({ ...user, [target.name]: target.value })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validCheck(user)) dispatch(signupAction(user))
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <>
      {loading && <LoaderAnimation />}
      <Helmet>
        <title>Sign Up - ResoBin</title>
        <meta
          name="description"
          content="Signup if you don't have an account yet"
        />
      </Helmet>
      <Navbar button="Login" buttonLink="/login" />

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
