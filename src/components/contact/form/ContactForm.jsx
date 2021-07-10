import FormBody from 'components/contact/form/FormBody'
import { Divider } from 'components/shared'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 21rem 1rem 2rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
`

const Title = styled.h4`
  padding: 2.5rem 2.5rem 1rem;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 30px;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const ContactForm = () => {
  return (
    <Container>
      <Title> Contact us </Title>
      <Divider />
      <FormBody />
    </Container>
  )
}

export default ContactForm
