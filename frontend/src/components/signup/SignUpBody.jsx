import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { InputRounded as Input, ButtonSquare } from 'components/shared'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword, Profile, User } from '@styled-icons/remix-line'

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

const ForgetPass = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 300;
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

const SignUpBody = () => {
  const buttonStyle = { marginTop: '1rem', fontSize: '1.25rem', width: '100%' }
  return (
    <Container>
      <Input type="text" placeholder="Full name" icon={Profile} />
      <Input type="text" placeholder="Username" icon={User} />
      <Input type="text" placeholder="Email" icon={Email} />
      <Input type="password" placeholder="Password" icon={LockPassword} />
      <Input
        type="password"
        placeholder="Confirm password"
        icon={LockPassword}
      />

      <Link style={{ all: 'initial' }} to="/login">
        <ButtonSquare type="submit" style={buttonStyle}>
          Sign up
        </ButtonSquare>
      </Link>
      <ForgetPass to="/login">Already have an account?</ForgetPass>
    </Container>
  )
}

export default SignUpBody
