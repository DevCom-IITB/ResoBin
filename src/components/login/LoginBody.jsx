import styled from 'styled-components'
import { InputRounded, ButtonSquare } from 'components/shared'
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
      <InputRounded type="text" placeholder="Email" icon={Email} />
      <InputRounded
        type="password"
        placeholder="Password"
        icon={LockPassword}
      />
      
      <ButtonSquare type="submit" style={{ 'font-size': '1.25rem' }}>
        Login
      </ButtonSquare>
    </Container>
  )
}

export default FormBody
