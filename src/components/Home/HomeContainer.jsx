import styled from 'styled-components/macro'

import HomeItem from 'components/Home/HomeItem'
import { Aside, PageHeading, PageTitle } from 'components/shared'

const HomeContainer = () => {
  return (
    <>
      <PageHeading>
        <PageTitle>Feed</PageTitle>
      </PageHeading>

      <Container>
        <HomeItem />
        <HomeItem />
        <HomeItem />
      </Container>

      <Aside title="Popular">
        <h1>Hello</h1>
      </Aside>
    </>
  )
}

export default HomeContainer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`
