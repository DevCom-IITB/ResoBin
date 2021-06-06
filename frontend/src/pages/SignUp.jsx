import styled from 'styled-components'
import { SignUpBody } from 'components/signup'
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

const TitleHeader = styled.h4`
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 4px;
  padding: 0.5rem 0px 0rem;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`

const SignUp = () => {
  return (
    <Container>
      <Navbar
        button="Login"
        buttonLink="/login"
        shadow="0 0 0.5rem rgba(0, 0, 0, 0.5)"
      />
      <FormBox>
        <TitleHeader>Create an account</TitleHeader>
        <SignUpBody />
      </FormBox>
    </Container>
  )
}

export default SignUp
