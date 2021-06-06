import { Link } from 'react-router-dom'
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 480px;
  padding: 2.5rem 0;
  background-color: ${({ theme }) => theme.darksecondary};
  border-radius: 8px;
  box-shadow: 0px 0px 0.75rem rgba(0, 0, 0, 0.4);
`

const TitleHeader = styled.h4`
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 4px;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`

const StyledLink = styled(Link)`
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

const SignUp = () => {
  return (
    <Container>
      <Navbar
        button="Login"
        buttonLink="/login"
        shadow="0 0 0.5rem rgba(0, 0, 0, 0.5)"
      />
      <FormBox>
        <TitleHeader>Create an Account</TitleHeader>
        <SignUpBody />
        <StyledLink to="/login">Already have an account? Login!</StyledLink>
      </FormBox>
    </Container>
  )
}

export default SignUp
