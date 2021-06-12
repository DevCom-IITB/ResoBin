import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  InputRounded as Input,
  ButtonSquare,
  Checkbox,
} from 'components/shared'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword, User } from '@styled-icons/remix-line'
// import { GoogleAuth } from 'components/login'

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

const LoginBody = ({ onChange, onSubmit, user }) => {
  const buttonStyle = { fontSize: '1.25rem', width: '100%' }

  return (
    <FormContainer onSubmit={onSubmit}>
      <Input
        name="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={onChange}
        Icon={User}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={onChange}
        Icon={LockPassword}
      />

      <ContainerSpaceBetween>
        <Checkbox label="Remember me" />
        <StyledLink to="/forgot-password">Forgot password?</StyledLink>
      </ContainerSpaceBetween>

      <ButtonSquare type="submit" style={buttonStyle}>
        Login
      </ButtonSquare>
      {/* <GoogleAuth /> */}
    </FormContainer>
  )
}

export default LoginBody
