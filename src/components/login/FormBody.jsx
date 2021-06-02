import styled from 'styled-components'
import { StyledInput } from 'components/shared/FormElements'
// import { User } from '@styled-icons/heroicons-solid'
import { Email } from '@styled-icons/material-outlined'

const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height:100%;
	margin-top: 2rem;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 2.75rem;
  width: 100%;
  border-radius: 1.5rem;
  background: white;
  overflow: hidden;
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.3);
`

const EmailInput = styled.input`
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  padding-left: 1.5rem;

  font-size: 1.25rem;
  font-weight: 600;
  color: #1f1c2e;

  &::placeholder {
    color: #1f1c2e;
    opacity: 0.6;
  }
`

const StyledEmail = styled(Email)`
  color: #807da0;
  width: 1.75rem;
  margin: 0 1rem;
`

const FormBody = () => {
  return (
    <Body>
      <Container>
        <EmailInput type="text" placeholder="Email" />
        <StyledEmail />
      </Container>
    </Body>
  )
}

export default FormBody
