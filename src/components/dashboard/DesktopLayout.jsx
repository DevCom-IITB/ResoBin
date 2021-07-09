import Navbar from 'components/navbar'
import Sidebar from 'components/sidebar'
import { ScrollToTop } from 'hoc'
import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem calc(100vh - 4rem);
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'header header'
    'navigation content';
`

const NavbarContainer = styled.div`
  z-index: 9; /* To put navbar at the top */
  grid-area: header;
  box-shadow: ${({ shadow }) =>
    shadow || '12rem 0px 0.5rem rgba(0, 0, 0, 0.5)'};
`

const SidebarContainer = styled.div`
  z-index: 8; /* For shadow effects */
  overflow: auto;
  grid-area: navigation;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
`

const ContentContainer = styled.div`
  position: sticky;
  top: 0;
  overflow: auto;
  grid-area: content;
`

const DesktopLayout = ({ children }) => {
  return (
    <ScrollToTop>
      <GridContainer>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>

        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>

        <ContentContainer>{children}</ContentContainer>
      </GridContainer>
    </ScrollToTop>
  )
}

export default DesktopLayout
