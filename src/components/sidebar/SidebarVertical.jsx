import {
  BookOpen,
  ChartPie,
  CloudUpload,
  Cog,
  Logout,
} from '@styled-icons/heroicons-outline'
import { ContactSupport } from '@styled-icons/material-outlined'
import { BookmarkOutline } from '@styled-icons/zondicons'
import ProfileImage from 'assets/images/ProfileImg_Laxman.jpg'
import { Divider } from 'components/shared'
import { ProfileImgItem, SidebarItem } from 'components/sidebar'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 3rem;
  z-index: 8; /* For shadow effects */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9rem;
  height: 100%;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
`

const Sidebar = () => {
  return (
    <Container>
      <SidebarItem
        title="Courses"
        icon={<BookOpen size="22" />}
        to="/dashboard/courses"
      />
      <SidebarItem
        title="Contribute"
        icon={<CloudUpload size="22" />}
        to="/dashboard/contribute"
      />
      <SidebarItem
        title="Stats"
        icon={<ChartPie size="22" />}
        to="/dashboard/stats"
      />

      <Divider margin="1rem 0" />
      <ProfileImgItem title="Laxman D." src={ProfileImage} />

      <SidebarItem
        title="Favourites"
        icon={<BookmarkOutline size="18" title="Check course material" />}
        to="/dashboard/favourites"
      />
      <SidebarItem
        title="Account"
        icon={<Cog size="22" />}
        exact
        to="/dashboard/account"
      />
      <SidebarItem title="Sign out" icon={<Logout size="22" />} to="/login" />

      <Divider margin="1rem 0" />
      <SidebarItem
        title="Get help"
        icon={<ContactSupport size="20" />}
        to="/dashboard/contact"
      />
    </Container>
  )
}

export default Sidebar
