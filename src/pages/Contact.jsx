import { Helmet } from 'react-helmet-async'

import { ContactContainer } from 'components/Contact'
import { PageContainer } from 'components/shared'

const Contribute = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Contact - ResoBin</title>
        <meta name="description" content="Contact us to clarify any issues" />
      </Helmet>

      <ContactContainer />
    </PageContainer>
  )
}

export default Contribute
