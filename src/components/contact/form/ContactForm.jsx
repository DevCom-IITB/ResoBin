import styled from 'styled-components'
import { Divider } from 'components/shared'
import FormBody from 'components/contact/form/FormBody'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.darksecondary};
  margin: 6rem 21rem 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.5);
`

const Title = styled.h4`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 30px;
  letter-spacing: 1.5px;
  padding: 2.5rem 2.5rem 1rem;
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
