import { useState } from 'react'
import styled from 'styled-components'
import {
  StyledInput,
  StyledTextArea,
  StyledButton,
} from 'components/contact/form/Input'

const initalState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const ContainerForm = styled.form`
  margin: 2rem;
`

const Label = styled.div`
  
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
      <StyledInput placeholder="Subject" type="text" />
      
      <Label htmlFor="message">Message</Label>
      <StyledTextArea
        name="message"
        value={state.message}
        onChange={handleInput}
      />

      <StyledButton type="submit" disabled="true">
        Send Message
      </StyledButton>
    </ContainerForm>
  )
}

export default FormBody
