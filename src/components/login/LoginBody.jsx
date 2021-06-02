import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { InputRounded, ButtonSquare, Divider } from 'components/shared'
import { LoginUtils } from 'components/login'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword } from '@styled-icons/remix-line'
import Google from 'assets/images/Google Signin/btn_google_signin_dark_normal_web@2x.png'

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

const OrDivider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 1rem;
`

const GoogleSignIn = styled.img`
  cursor: pointer;
  width: 13rem;
  margin: 0 auto;
  user-select: none;
`

const FormBody = () => {
  return (
    <Container>
      <InputRounded type="text" placeholder="Email" icon={Email} />
      <InputRounded
        type="password"
        placeholder="Password"
        icon={LockPassword}
      />
      <LoginUtils />

      <ButtonSquare
        type="submit"
        style={{ 'margin-top': '0.5rem', 'font-size': '1.25rem' }}
      >
        Login
      </ButtonSquare>

      <OrDivider>
        <Divider style={{ width: '42%' }} />
        OR
        <Divider style={{ width: '42%' }} />
      </OrDivider>

      <GoogleSignIn src={Google} />
    </Container>
  )
}

export default FormBody
