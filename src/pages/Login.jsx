import styled from 'styled-components'
import { HEX2RGBA } from 'helpers'
import { LoginHeader, LoginBody } from 'components/login'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  z-index: 9999;
  position: fixed;
  background-color: ${({ theme }) => theme.secondary};
`

const FormBox = styled.div`
  width: 480px;
  background-color: ${({ theme }) => HEX2RGBA(theme.darksecondary, 90)};
  padding: 2rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 8px;
  box-shadow: 0px 0px 0.75rem rgba(0, 0, 0, 0.4);
`

const Login = () => {
  return (
    <Container>
      <FormBox>
        <LoginHeader />
        <LoginBody />
      </FormBox>
    </Container>
  )
}

export default Login
