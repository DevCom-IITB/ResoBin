import styled from 'styled-components'

import ImgLaxman from 'assets/images/ProfileImg_Laxman.jpg'
import Divider from 'components/shared/Divider'

import ContributorItem from './ContributorItem'
// import getContributors from './githubAPI'

const Container = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.headerHeight};
  right: 0;
  z-index: 7;
  width: ${({ theme }) => theme.asideWidthRight};
  height: 100%;
  background: ${({ theme }) => theme.secondary};
  box-shadow: inset 2px 0 5px rgba(0, 0, 0, 0.3);
`

const Title = styled.h4`
  padding: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
`

const ContributorList = () => {
  // const contributors = getContributors()
  
  return (
    <Container>
      <Title>Made with ❤️ by</Title>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />

      <ContributorItem
        name="Laxman Desai"
        img={ImgLaxman}
        href="https://github.com/relaxxpls"
      />
      <ContributorItem
        name="John Doe"
        img={ImgLaxman}
        href="https://github.com/relaxxpls"
        switchOrder
      />
    </Container>
  )
}

export default ContributorList
