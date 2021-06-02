import styled from 'styled-components'
import InputRound from 'components/shared/InputRound'
import { StyledButton } from 'components/shared/FormElements'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword } from '@styled-icons/remix-line'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;

  > * {
    margin-bottom: 1.5rem;
  }
`

const FormBody = () => {
  return (
    <Container>
      <InputRound type="text" placeholder="Email" icon={Email} />
      <InputRound type="password" placeholder="Password" icon={LockPassword} />
      <StyledButton type="submit" style={{ 'font-size': '1.25rem' }}>
        Login
      </StyledButton>
    </Container>
  )
}

export default FormBody
