import { Email } from '@styled-icons/material-outlined'
import { LockPassword, Profile, User } from '@styled-icons/remix-line'
import { ButtonSquare, InputRounded as Input } from 'components/shared'
import { CSRFToken } from 'helpers'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { fontSize } from 'styles/responsive'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.5rem;
  margin-top: 1rem;
  > * {
    margin-bottom: 1.5rem;
  }
`

const SubTitle = styled.h4`
  display: flex;
  font-weight: 300;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textColor};
`

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
    color: ${({ theme }) => theme.textColor};
  }
`

const SignupBody = ({ onChange, onSubmit, user }) => {
  const buttonStyle = { fontSize: '1.25rem', width: '100%' }

  return (
    <FormContainer onSubmit={onSubmit}>
      <CSRFToken />
      <Input
        name="fullname"
        type="text"
        placeholder="Full name"
        value={user.fullname}
        onChange={onChange}
        Icon={Profile}
        required
      />
      <Input
        name="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={onChange}
        Icon={User}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={onChange}
        Icon={Email}
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={onChange}
        Icon={LockPassword}
        minLength="6"
        required
      />
      <Input
        name="passwordAgain"
        type="password"
        placeholder="Confirm password"
        value={user.passwordAgain}
        onChange={onChange}
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

export default SignupBody
