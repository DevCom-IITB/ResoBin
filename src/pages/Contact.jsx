import { Helmet } from 'react-helmet-async'

import { ContactContainer, DeveloperList } from 'components/Contact'

const Contribute = () => {
  return (
    <>
      <Helmet>
        <title>Contact - ResoBin</title>
        <meta name="description" content="Contact us to clarify any issues" />
      </Helmet>

      <ContactContainer />
      <DeveloperList />
    </>
  )
}

export default Contribute
