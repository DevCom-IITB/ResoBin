import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { ContactForm, DeveloperList } from 'components/contact'

const Container = styled.div`
  margin-left: 11.5rem;
`

const Contribute = () => {
  return (
    <Container>
      <Helmet>
        <title>Get Help - ResoBin</title>
        <meta name="description" content="Get help form" />
      </Helmet>

      <ContactForm />
      <DeveloperList />
    </Container>
  )
}

export default Contribute
