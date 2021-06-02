import styled from 'styled-components'
import Divider from 'components/shared/Divider'
import { HEX2RGBA } from 'helpers'
import { FormTitle, FormBody } from 'components/login'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  z-index: 9999;
  position: fixed;
  background-color: ${({ theme }) => theme.logo};
`

const FormBox = styled.div`
  width: 400px;
  height: 80%;
  background-color: ${({ theme }) => HEX2RGBA(theme.darksecondary, 90)};
  padding: 2rem;
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
        <FormTitle />
        <Divider />
        <FormBody />
        <Divider margin="0.5rem 0" />
      </FormBox>
    </Container>
  )
}

export default Login
