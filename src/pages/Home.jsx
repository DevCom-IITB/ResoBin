import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

import HomeContainer from 'components/Home/HomeContainer'
import { device } from 'styles/responsive'

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

      <HomeContainer />
    </Container>
  )
}

export default Home

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`
