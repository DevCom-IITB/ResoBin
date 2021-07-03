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
`

const TopbarContainer = styled.div`
  position: sticky;
  top: 0;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  z-index: 9;
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

        {props.children}
      </Container>
    </ScrollToTop>
  )
}

export default MobileLayout
