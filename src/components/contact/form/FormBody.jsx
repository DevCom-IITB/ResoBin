import { useState } from 'react'
import styled from 'styled-components'
import {
  StyledInput,
  StyledTextArea,
  StyledButton,
} from 'components/shared/FormElements'

const initalState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const ContainerForm = styled.form`
  margin: 2rem;
  appearance: none;
`

const FormBody = () => {
  const [state, setState] = useState(initalState)
  
  const handleInput = (e) => {
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setState((prev) => ({ ...prev, [inputName]: value }))
  }

  return (
    <ContainerForm>
      <StyledInput placeholder="Name" type="text" />
      <StyledInput placeholder="Email" type="email" />
      <StyledInput placeholder="Subject" type="text" height="2rem" />

      <StyledTextArea
        placeholder="Message"
        value={state.message}
        onChange={handleInput}
      />

      <StyledButton type="submit">
        Send Message
      </StyledButton>
    </ContainerForm>
  )
}

export default FormBody
