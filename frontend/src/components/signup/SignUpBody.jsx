import { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { InputRounded as Input, ButtonSquare } from 'components/shared'
import { signupAction } from 'store/actions/auth'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword, Profile, User } from '@styled-icons/remix-line'

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
  fullname: '',
  username: '',
  email: '',
  password: '',
  passwordAgain: '',
}

const validCheck = (data) => {
  for (const key in data) if (!data[key]) return false
  if (data.password !== data.passwordAgain) return false
  return true
}

const SignupBody = ({ signupAction, isAuthenticated }) => {
  const buttonStyle = { fontSize: '1.25rem', width: '100%' }

  const [user, setUser] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((user) => ({ ...user, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validCheck(user)) {
      signupAction(user)
      setSubmitted(true)
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  } else if (submitted) {
    return <Redirect to="/login" />
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
        required
      />

      <Input
        name="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
        Icon={User}
        required
      />

      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        Icon={Email}
        required
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        Icon={LockPassword}
        minLength="6"
        required
      />

      <Input
        name="passwordAgain"
        type="password"
        placeholder="Confirm password"
        value={user.passwordAgain}
        onChange={handleChange}
        Icon={LockPassword}
        required
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { signupAction })(SignupBody)
