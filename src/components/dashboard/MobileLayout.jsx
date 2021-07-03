import Navbar from 'components/navbar'
import Topbar from 'components/sidebar/1200px/Topbar'
import { ScrollToTop } from 'hoc'
import styled from 'styled-components'
import './StickyHeader.css'

const Container = styled.div`
  height: 100vh;
  overflow: auto;
`

const Container2 = styled.div`
  /* display: block;
  height: 10rem;
  background-color: green;
  overflow: auto; */
`

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  height: 4rem;
`

const TopbarContainer = styled.div`
  position: sticky;
  top: 0;
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
      <Container>
        {/* <NavbarContainer>
          <Navbar />
        </NavbarContainer> */}
        {/* <TopbarContainer>
          <Topbar />
        </TopbarContainer> */}
        {/* <ContentContainer> */}
        {/* {props.children} */}
        {/* </ContentContainer> */}
        <div className="body">
          <div className="header header__main">MAIN HEADER</div>
          <div className="header header__category header__category--top">
            Category 1
          </div>
          <div className="header header__category header__category--middle">
            Category 2
          </div>
          <div className="header header__category header__category--bottom">
            Category 3
          </div>
          <div className="header header__settings">Settings</div>
          <div className="main">
            <span>Main Content</span>
            <span>Main Content</span>
            <span>Main Content</span>
            <span>Main Content</span>
            <span>Main Content</span>
          </div>
        </div>
      </Container>
    </ScrollToTop>
  )
}

export default MobileLayout
