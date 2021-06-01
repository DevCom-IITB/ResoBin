import styled from 'styled-components'
import { StyledInput, StyledButton } from 'components/shared/FormElements'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height:100%;
	margin-top: 2rem;
`

const FormBody = () => {
  return (
    <Container>
      <StyledInput placeholder="Email" />
      <StyledInput placeholder="Password" />
      <StyledButton type="submit">Login</StyledButton>
    </Container>
  )
}

export default FormBody
