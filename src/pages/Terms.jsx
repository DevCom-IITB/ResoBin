import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
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
        <h3>
          You agree not to use this service for any other purpose other than
          expressly permitted by these terms and conditions.
        </h3>
        <span>
          The moderators reserve the right to update the following terms and
          conditions.
          <br />
          Failure to comply with these terms and conditions may result in
          termination of your account.
        </span>

        <ol>
          <li>
            You agree to post reviews or comments that are relevant to the
            course content and isn&lsquo;t a blatant criticism or defamation of
            the course and/or instructor.
          </li>
          <li>
            All of Your Content is your sole responsibility and ResoBin (and any
            of its creators/moderators) are not responsible for any material
            that you upload.
          </li>
          <li>
            You agree that your reviews will be civil and not include sending
            unsolicited marketing messages or broadcasts. ResoBin reserves the
            right to remove and permanently delete your content from the Service
          </li>
          <li>
            You agree that the material uploaded by you must credit and
            acknowledge the person contributing to the resource.
          </li>
          <li>
            You agree not to upload any malicious files or explicit material and
            engage in any other activity that may damage other&lsquo;s
            experiance of the webapp.
          </li>
          <li>
            You are expected to notify us immediately if you believe the
            confidentiality of your log-in credentials has been compromised or
            if you suspect unauthorized use of your account.
          </li>
          <li>
            ResoBin reserves the right to modify or discontinue the service
            anytime and terminate your account without notice
          </li>
          <li>
            You agree to receive communications from us electronically, such as
            email, text, or mobile push notices, or notices and messages on the
            Service.
          </li>
          <li>
            Please feel free to reach out via the&nbsp;
            <Link to="/contact">Contact Us</Link> page on the left for any
            queries and/or suggestions.
          </li>
        </ol>
      </Content>
    </PageContainer>
  )
}

export default Terms

const Content = styled.div`
  padding: 1.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: ${fontSize.responsive.md};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ol {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li {
    list-style-position: inside;
    list-style-type: decimal;
  }
`
