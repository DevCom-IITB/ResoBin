import { Helmet } from 'react-helmet-async'

import { FavouritesContainer } from 'components/Favourites'
import { PageContainer } from 'components/shared'

const Favourites = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Favourites - ResoBin</title>
        <meta name="description" content="Your favourite courses" />
      </Helmet>

      <FavouritesContainer />
    </PageContainer>
  )
}

export default Favourites
