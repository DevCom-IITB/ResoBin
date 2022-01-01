// import { useState } from 'react'
import styled from 'styled-components/macro'

import { DeveloperList } from 'components/Contact'
import {
  PageHeading,
  PageTitle,
  ButtonSquare,
  InputSquared,
  TextAreaSquared,
} from 'components/shared'

const ContactContainer = () => {
  // const [state, setState] = useState(initalState)

  // const handleInput = (e) => {
  //   const inputName = e.currentTarget.name
  //   const value = e.currentTarget.value
  //   setState((prev) => ({ ...prev, [inputName]: value }))
  // }

  return (
    <>
      <PageHeading>
        <PageTitle>Contact us</PageTitle>
      </PageHeading>

      <ContainerForm>
        <InputSquared placeholder="Subject" type="text" />

        <TextAreaSquared placeholder="Message" />

        <ButtonSquare type="submit">Send Message</ButtonSquare>
      </ContainerForm>

      <DeveloperList />
    </>
  )
}

const ContainerForm = styled.form`
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 50%);
  margin-bottom: 1rem;
`

export default ContactContainer
