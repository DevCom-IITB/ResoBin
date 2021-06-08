import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { InputRounded as Input, ButtonSquare } from 'components/shared'
// import { GoogleAuth } from 'components/login'
import { Checkbox } from 'components/shared'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword } from '@styled-icons/remix-line'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userActions from 'store/actions/userActions'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  padding: 0 2rem;
  > * {
    margin-bottom: 1.5rem;
  }
`

const ContainerSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  text-decoration: none;
  user-select: none;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
  }
`

const initialState = {
  email: '',
  password: '',
}

const LoginBody = () => {
  const buttonStyle = { fontSize: '1.25rem', width: '100%' }

  const [user, setUser] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  // const loggingin = useSelector((state) => state.authentication.loggingIn)
  const dispatch = useDispatch()
  const location = useLocation()

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((inputs) => ({ ...inputs, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (user.email && user.password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: '/' } }
      dispatch(userActions.login(user.email, user.password, from))
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        Icon={Email}
      />
      <Input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        Icon={LockPassword}
      />
      <ContainerSpaceBetween>
        <Checkbox label="Remember me" />
        <StyledLink to="/forgot-password">Forgot password?</StyledLink>
      </ContainerSpaceBetween>

      {/* <Link style={{ all: 'initial' }} to="/dashboard"> */}
      <ButtonSquare type="submit" style={buttonStyle}>
        Login
      </ButtonSquare>
      {/* </Link> */}
      {/* <GoogleAuth /> */}
    </FormContainer>
  )
}

export default LoginBody
