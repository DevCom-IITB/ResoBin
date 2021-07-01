import styled from 'styled-components'
import Sidebar from 'components/sidebar'
import Navbar from 'components/navbar'
import { ScrollToTop } from 'hoc'

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem calc(100vh - 4rem);
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'navbar navbar'
    'sidebar content';
`

const NavbarContainer = styled.div`
  grid-area: navbar;
`

const SidebarContainer = styled.div`
  grid-area: sidebar;
  overflow: auto;
`

const ContentContainer = styled.div`
  grid-area: content;
  overflow: auto;
`

const DashboardLayout = (props) => {
  return (
    <ScrollToTop>
      <GridContainer>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>

        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>

        <ContentContainer>{props.children}</ContentContainer>
      </GridContainer>
    </ScrollToTop>
  )
}

export default DashboardLayout
