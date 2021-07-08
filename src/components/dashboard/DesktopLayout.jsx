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
  grid-area: header;
  box-shadow: ${({ shadow }) =>
    shadow || '12rem 0px 0.5rem rgba(0, 0, 0, 0.5)'};
  z-index: 9; /* To put navbar at the top */
`

const SidebarContainer = styled.div`
  grid-area: navigation;
  overflow: auto;
  z-index: 8; /* For shadow effects */
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.5);
`

const ContentContainer = styled.div`
  grid-area: content;
  overflow: auto;
  position: sticky;
  top: 0;
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
