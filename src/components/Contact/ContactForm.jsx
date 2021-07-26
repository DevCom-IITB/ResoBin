import styled from 'styled-components/macro'

import ContactFormBody from './ContactFormBody'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  margin: 0 ${({ theme }) => theme.asideWidthRight} 0
    ${({ theme }) => theme.asideWidthLeft};
`

const Title = styled.h4`
  margin: 1rem 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.darksecondary};
`

const ContactForm = () => {
  return (
    <Container>
      <Title> Contact us </Title>
      <ContactFormBody />
    </Container>
  )
}

export default ContactForm
