import styled from 'styled-components'
import { LoginHeader, LoginBody } from 'components/login'
import Navbar from 'components/navbar'

const Container = styled.div`
  margin: 2rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.secondary};
`

const FormBox = styled.div`
  width: 480px;
  background-color: ${({ theme }) => theme.darksecondary};
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 8px;
  box-shadow: 0px 0px 0.75rem rgba(0, 0, 0, 0.4);
`

const Login = () => {
  return (
    <Container>
      <Navbar
        button="Sign up"
        buttonLink="/signup"
        shadow="0 0 0.5rem rgba(0, 0, 0, 0.5)"
      />
      <FormBox>
        <LoginHeader />
        <LoginBody />
      </FormBox>
    </Container>
  )
}

export default Login
