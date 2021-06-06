import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { InputRounded as Input, ButtonSquare } from 'components/shared'
// import { GoogleAuth } from 'components/login'
import { Checkbox } from 'components/shared'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword } from '@styled-icons/remix-line'

const Container = styled.div`
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

const LoginBody = () => {
  const buttonStyle = { fontSize: '1.25rem', width: '100%' }
  return (
    <Container>
      <Input type="text" placeholder="Email" icon={Email} />
      <Input type="password" placeholder="Password" icon={LockPassword} />
      <ContainerSpaceBetween>
        <Checkbox label="Remember me" />
        <StyledLink to="/forgot-password">Forgot password?</StyledLink>
      </ContainerSpaceBetween>

      <Link style={{ all: 'initial' }} to="/dashboard">
        <ButtonSquare type="submit" style={buttonStyle}>
          Login
        </ButtonSquare>
      </Link>
      {/* <GoogleAuth /> */}
    </Container>
  )
}

export default LoginBody
