import { Link } from 'react-router-dom'
import styled from 'styled-components'
// Components:
import { InputRounded as Input, ButtonSquare, Divider } from 'components/shared'
import { Checkbox } from 'components/shared'
// Icons:
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

const ContainerSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const ForgetPass = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  text-decoration: none;
  user-select: none;
`

const ContainerOr = styled.div`
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
      <Input type="text" placeholder="Email" icon={Email} />
      <Input type="password" placeholder="Password" icon={LockPassword} />
      <ContainerSpaceBetween>
        <Checkbox label="Remember me" />
        <ForgetPass to="reset">Forgot password?</ForgetPass>
      </ContainerSpaceBetween>

      <Link style={{ all: 'initial' }} to="/dashboard">
        <ButtonSquare
          type="submit"
          style={{ 'font-size': '1.25rem', width: '100%' }}
        >
          Login
        </ButtonSquare>
      </Link>

      <ContainerOr>
        <Divider style={{ width: '42%' }} />
        OR
        <Divider style={{ width: '42%' }} />
      </ContainerOr>

      <GoogleSignIn src={Google} />
    </Container>
  )
}

export default FormBody
