import { LockPassword, User } from '@styled-icons/remix-line'
import { Checkbox } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { GoogleAuth } from 'components/login'
import { ButtonSquare, InputRounded as Input } from 'components/shared'

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

const ContainerSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const ForgotPassword = styled(Link)`
  margin-left: 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
    color: ${({ theme }) => theme.textColor};
  }
`

const buttonStyle = {
  fontSize: '1rem',
}

const LoginBody = ({ onChange, onSubmit, user }) => {
  // const [rememberMe, setRememberMe] = useState(false)
  const handleClick = ({ target }) => {
    // setRememberMe(target.checked)
    console.log(target)
  }

  return (
    <FormContainer onSubmit={onSubmit}>
      <GoogleAuth />
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
        <Checkbox key="rememberMe" value="rememberMe" onClick={handleClick}>
          Remember me
        </Checkbox>

        <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>
      </ContainerSpaceBetween>

      <ButtonSquare type="submit" style={buttonStyle}>
        Login
      </ButtonSquare>
    </FormContainer>
  )
}

export default LoginBody
