import styled from 'styled-components'
import Sidebar from 'components/sidebar'
import Navbar from 'components/navbar'
import { ScrollToTop } from 'hoc'

import Topbar from 'components/sidebar/1200px/Topbar'
import { useViewport } from ''

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem calc(100vh - 4rem);
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'header header'
    'navigation content';

  @media (max-width: 992px) {
    grid-template-rows: 4rem 4rem calc(100vh - 0rem);
    grid-template-columns: auto;

    grid-template-areas:
      'header'
      'navigation'
      'content';
  }
`

const NavbarContainer = styled.div`
  grid-area: header;
`

const SidebarContainer = styled.div`
  grid-area: navigation;
  overflow: auto;

  @media (max-width: 992px) {
    /* display: none; */
  }
`

const ContentContainer = styled.div`
  grid-area: content;
  overflow: auto;
  position: sticky;
  top: 0;
`

const DashboardLayout = (props) => {
  const { width } = useViewport()
  const breakpoint = 620

  return (
    <ScrollToTop>
      <GridContainer>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>

        <SidebarContainer>
          {width < breakpoint ? <Sidebar /> : <Topbar />}
        </SidebarContainer>

        <ContentContainer>{props.children}</ContentContainer>
      </GridContainer>
    </ScrollToTop>
  )
}

export default DashboardLayout
