import Navbar from 'components/navbar'
import Topbar from 'components/sidebar/1200px/Topbar'
import { ScrollToTop } from 'hoc'
import styled from 'styled-components'

const Container = styled.div`
  height: auto;
`

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  /* box-shadow: ${({ shadow }) =>
    shadow || '0 0 0.5rem rgba(0, 0, 0, 0.5)'}; */
  /* z-index: 9; */
`

const TopbarContainer = styled.div`
  position: sticky;
  top: 0;
`

const ContentContainer = styled.div`
  position: sticky;
  top: 4rem;
  height: 4rem;
`

const MobileLayout = (props) => {
  return (
    <ScrollToTop>
      <Container>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>

        <TopbarContainer>
          <Topbar />
        </TopbarContainer>

        <ContentContainer>{props.children}</ContentContainer>
        {/* <ContentContainer>Settings</ContentContainer> */}
        <div style={{ height: '200vh' }}>{/* {props.children} */}</div>
      </Container>
    </ScrollToTop>
  )
}

export default MobileLayout
