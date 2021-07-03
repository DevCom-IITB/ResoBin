import Navbar from 'components/navbar'
import Topbar from 'components/sidebar/1200px/Topbar'
import { ScrollToTop } from 'hoc'
import styled from 'styled-components'

const GridContainer = styled.div`
  grid-template-rows: 4rem 4rem calc(100vh - 0rem);
  grid-template-columns: auto;

  grid-template-areas:
    'header'
    'navigation'
    'content';
`

const NavbarContainer = styled.div`
  grid-area: header;
`

const SidebarContainer = styled.div`
  grid-area: navigation;
  overflow: auto;
`

const ContentContainer = styled.div`
  grid-area: content;
  overflow: auto;
  position: sticky;
  top: 0;
`

const MobileLayout = (props) => {
  return (
    <ScrollToTop>
      <GridContainer>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>

        <SidebarContainer>
          <Topbar />
        </SidebarContainer>

        <ContentContainer>{props.children}</ContentContainer>
      </GridContainer>
    </ScrollToTop>
  )
}

export default MobileLayout
