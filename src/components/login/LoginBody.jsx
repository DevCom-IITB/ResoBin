import { LockPassword, User } from '@styled-icons/remix-line'
import { Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { GoogleAuth } from 'components/login'
import { ButtonSquare, InputRounded as Input } from 'components/shared'

const LoginBody = ({ onChange, onSubmit, user }) => {
  // const [rememberMe, setRememberMe] = useState(false)
  const handleClick = ({ target }) => {
    // setRememberMe(target.checked)
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

      <ButtonSquare type="submit" style={{ fontSize: '1rem' }}>
        Login
      </ButtonSquare>
    </FormContainer>
  )
}

export default LoginBody

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  padding: 0 1.5rem;

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

const ForgotPassword = styled(Link)`
  margin-left: 1rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  font-size: 0.875rem;

  &:hover {
    color: ${({ theme }) => theme.textColor};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
  }
`
