import { Helmet } from 'react-helmet-async'

import { ContactContainer, DeveloperList } from 'components/Contact'
import { PageHeading, PageTitle, PageContainer } from 'components/shared'

const Contribute = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Contact - ResoBin</title>
        <meta name="description" content="Contact us to clarify any issues" />
      </Helmet>

      <PageHeading>
        <PageTitle>Contact us</PageTitle>
      </PageHeading>

      <ContactContainer />
      <DeveloperList />
    </PageContainer>
  )
}

export default Contribute
