import styled from 'styled-components/macro'

import { PageHeading, PageTitle } from 'components/shared'

import ContactFormBody from './ContactFormBody'

const ContactContainer = () => {
  return (
    <Container>
      <PageHeading>
        <PageTitle>Contact us</PageTitle>
      </PageHeading>
      <ContactFormBody />
    </Container>
  )
}

export default ContactContainer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  margin: 0 ${({ theme }) => theme.asideWidthRight} 0
    ${({ theme }) => theme.asideWidthLeft};
`
