import styled from 'styled-components/macro'

import HomeItem from 'components/Home/HomeItem'

const HomeContainer = () => {
  return (
    <Container>
      <HomeItem />
      <HomeItem />
      <HomeItem />
      <HomeItem />
    </Container>
  )
}

export default HomeContainer

const Container = styled.ul`
  width: 100%;
  padding: 1rem;
`
