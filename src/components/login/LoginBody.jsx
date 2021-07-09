import { LockPassword, User } from '@styled-icons/remix-line'
import { GoogleAuth } from 'components/login'
import {
  ButtonSquare,
  Checkbox,
  InputRounded as Input,
} from 'components/shared'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2rem;
  margin-top: 2rem;
  > * {
    margin-bottom: 1.5rem;
  }
`

const ContainerSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const StyledLink = styled(Link)`
  font-weight: 300;
  font-size: 1rem;
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

const buttonStyle = {
  fontSize: '1.25rem',
  width: '100%',
}

const LoginBody = ({ onChange, onSubmit, user }) => {
  const [rememberMe, setRememberMe] = useState(false)
  const handleClick = ({ target }) => {
    setRememberMe(target.checked)
  }

  return (
    <FormContainer onSubmit={onSubmit}>
      <GoogleAuth />
      <Input
        id="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={onChange}
        Icon={User}
      />
      <Input
        id="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={onChange}
        Icon={LockPassword}
      />

      <ContainerSpaceBetween>
        <Checkbox
          id="rememberMe"
          value={rememberMe}
          label="Remember me"
          onClick={handleClick}
        />
        <StyledLink to="/forgot-password">Forgot password?</StyledLink>
      </ContainerSpaceBetween>

      <ButtonSquare type="submit" style={buttonStyle}>
        Login
      </ButtonSquare>
    </FormContainer>
  )
}

export default LoginBody
