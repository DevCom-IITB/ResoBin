import { Helmet } from 'react-helmet-async'

import { ContactForm, ContributorList } from 'components/Contact'

const Contribute = () => {
  return (
    <>
      <Helmet>
        <title>Contact - ResoBin</title>
        <meta name="description" content="Contact us page to clarify any issues" />
      </Helmet>

      <ContactForm />
      <ContributorList />
    </>
  )
}

export default Contribute
