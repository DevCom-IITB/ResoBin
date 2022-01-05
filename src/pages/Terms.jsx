import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

import {
  PageContainer,
  PageHeading,
  PageSubtitle,
  PageTitle,
} from 'components/shared'
import { fontSize } from 'styles/responsive'

const Terms = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Terms - ResoBin</title>
        <meta name="description" content="Terms and Conditions" />
      </Helmet>

      <PageHeading>
        <PageTitle>Terms and Conditions</PageTitle>
        <PageSubtitle>Last updated: January 05, 2022</PageSubtitle>
      </PageHeading>

      <Content>
        <p>To be updated.</p>
      </Content>
    </PageContainer>
  )
}

export default Terms

const Content = styled.div`
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.75rem;
  font-size: ${fontSize.responsive.md};

  a {
    color: ${({ theme }) => theme.primary};
    /* font-family:  */

    &:hover {
      text-decoration: underline;
    }
  }
`
