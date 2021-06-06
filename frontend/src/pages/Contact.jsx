import styled from 'styled-components'
import { ContactForm, DeveloperList } from 'components/contact'

const Container = styled.div`
  margin: 4rem 0 0 11.5rem;
`

const Contribute = () => {
  return (
    <Container>
      <ContactForm />
      <DeveloperList />
    </Container>
  )
}

export default Contribute
