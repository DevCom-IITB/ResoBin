import { Helmet } from 'react-helmet-async'

import { HomeContainer } from 'components/Home'
import { PageContainer } from 'components/shared'

const Home = () => {
  return (
    <PageContainer disable={["aside"]}>
      <Helmet>
        <title>ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

      <HomeContainer />
    </PageContainer>
  )
}

export default Home
