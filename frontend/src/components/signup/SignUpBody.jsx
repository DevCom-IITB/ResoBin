import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { InputRounded as Input, ButtonSquare } from 'components/shared'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword, Profile, User } from '@styled-icons/remix-line'

import { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { signupAction } from 'store/actions/auth'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  padding: 0 2rem;
  > * {
    margin-bottom: 1.5rem;
  }
`

const SubTitle = styled.h4`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  color: ${({ theme }) => theme.textColor};
  font-weight: 300;
  letter-spacing: 1px;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-decoration: none;
  user-select: none;
  text-align: center;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
  }
`

const initialState = {
  // fullname: '',
  username: '',
  // email: '',
  password: '',
  passwordAgain: '',
}

const nullCheck = (data) => {
  for (const key in data) if (!data[key]) return false
  return true
}

const SignUpBody = () => {
  const buttonStyle = { fontSize: '1.25rem', width: '100%' }

  const [user, setUser] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  // const registering = useSelector((state) => state.signup.registering)
  const dispatch = useDispatch()

  // reset login status
  // useEffect(() => {
  //   dispatch(userActions.logout())
  // }, [dispatch])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((user) => ({ ...user, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (nullCheck(user)) {
      // dispatch(userActions.register(user))
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        name="fullname"
        type="text"
        placeholder="Full name"
        value={user.fullname}
        onChange={handleChange}
        Icon={Profile}
      />

      <Input
        name="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
        Icon={User}
      />

      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        Icon={Email}
      />

      <Input
        name="password1"
        type="password"
        placeholder="Password"
        value={user.password1}
        onChange={handleChange}
        Icon={LockPassword}
      />

      <Input
        name="password2"
        type="password"
        placeholder="Confirm password"
        value={user.password2}
        onChange={handleChange}
        Icon={LockPassword}
      />

      <SubTitle>
        I agree to the&nbsp;
        <StyledLink to="/404">privacy policy</StyledLink>
        &nbsp;and&nbsp;
        <StyledLink to="/404">terms of service</StyledLink>.
      </SubTitle>

      <ButtonSquare type="submit" style={buttonStyle}>
        Sign up
      </ButtonSquare>
    </FormContainer>
  )
}

export default SignUpBody
