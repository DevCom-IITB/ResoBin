import { Helmet } from 'react-helmet-async'

import { ContributeContainer } from 'components/contribute'
import { PageHeading, PageTitle, PageContainer } from 'components/shared'

const Contribute = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Contribute - ResoBin</title>
        <meta name="description" content="Upload and share your own notes" />
      </Helmet>

      <PageHeading>
        <PageTitle>Contribute</PageTitle>
      </PageHeading>

      <ContributeContainer />
    </PageContainer>
  )
}

export default Contribute
