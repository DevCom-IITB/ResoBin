import styled from 'styled-components'
import { Divider } from 'components/shared'
import SidebarItem from 'components/sidebar/SidebarItem'
import ProfileImgItem from 'components/sidebar/ProfileImgItem'
import ProfileImage from 'assets/images/ProfileImg_Laxman.jpg'
import {
  BookOpen,
  Bookmark,
  ChartPie,
  CloudUpload,
  Cog,
  Logout,
} from '@styled-icons/heroicons-outline'
import { ContactSupport } from '@styled-icons/material-outlined'

const Container = styled.div`
  background: ${({ theme }) => theme.secondary};
  left: 0rem;
  top: 0rem;
  bottom: 0rem;
  width: 11.5rem; /* width: 184 px */
  position: fixed;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 8; /* For shadow effects */
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.5);
`

const Sidebar = () => {
  return (
    <Container>
      <SidebarItem
        title="Courses"
        icon={<BookOpen size="20" />}
        to="/courses"
        active
      />
      <SidebarItem
        title="Contribute"
        icon={<CloudUpload size="20" />}
        to="/contribute"
      />
      <SidebarItem title="Stats" icon={<ChartPie size="20" />} to="/stats" />

      <Divider margin="1.5rem 0" />
      <ProfileImgItem title="Laxman D." src={ProfileImage} />

      <SidebarItem
        title="Favorites"
        icon={<Bookmark size="20" title="Check course material" />}
        to="/favourites"
      />
      <SidebarItem title="Account" icon={<Cog size="20" />} exact to="/account" />
      <SidebarItem title="Sign out" icon={<Logout size="20" />} to="/login" />

      <Divider margin="1.5rem 0" />
      <SidebarItem
        title="Get help"
        icon={<ContactSupport size="20" />}
        to="/contact"
      />
    </Container>
  )
}

export default Sidebar
