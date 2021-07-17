import { Helmet } from 'react-helmet-async'

import { ContactForm, DeveloperList } from 'components/contact'

const Contribute = () => {
  return (
    <>
      <Helmet>
        <title>Get Help - ResoBin</title>
        <meta name="description" content="Get help form" />
      </Helmet>

      <ContactForm />
      <DeveloperList />
    </>
  )
}

export default Contribute
