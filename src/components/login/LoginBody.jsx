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

const GoogleSignIn = styled.img`
  cursor: pointer;
  /* height: 2rem; */
  /* width: 10rem; */
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

      <Divider />
      {/* <GoogleSignIn src={Google} /> */}
    </Container>
  )
}

export default FormBody
