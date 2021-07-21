import styled from 'styled-components'

import ImgLaxman from 'assets/images/ProfileImg_Laxman.jpg'
import { Developer } from 'components/contact'
import Divider from 'components/shared/Divider'

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

const DeveloperList = () => {
  return (
    <Container>
      <Title>Made with ❤️ by</Title>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />

      <Developer
        name="Laxman Desai"
        img={ImgLaxman}
        href="https://github.com/relaxxpls"
      />
      <Developer
        name="John Doe"
        img={ImgLaxman}
        href="https://github.com/relaxxpls"
        switchOrder
      />
    </Container>
  )
}

export default DeveloperList
