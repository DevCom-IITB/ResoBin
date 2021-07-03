// import ProfileImgItem from 'components/sidebar/ProfileImgItem'
// import ProfileImage from 'assets/images/ProfileImg_Laxman.jpg'
import {
  BookOpen,
  // ChartPie,
  // Logout,
  CloudUpload,
  Cog,
} from '@styled-icons/heroicons-outline'
// import { ContactSupport } from '@styled-icons/material-outlined'
import { BookmarkOutline } from '@styled-icons/zondicons'
// import TopbarItem from 'components/sidebar/mobile/TopbarItem'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;

  background: ${({ theme }) => theme.secondary};
  z-index: 100;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.5);
`

const Topbar = () => {
  return (
    <Container>
      <BookOpen size="1.5rem" />
      <CloudUpload size="1.5rem" />
      <BookmarkOutline size="1.25rem" title="Check course material" />
      <Cog size="1.5rem" />
      {/* <Logout size="1.75rem" />
      <ContactSupport size="1.75rem" /> */}
      {/* <TopbarItem
        title="Courses"
        icon={<BookOpen size="22px" />}
        to="/dashboard/courses"
      />
      <TopbarItem
        title="Contribute"
        icon={<CloudUpload size="22" />}
        to="/dashboard/contribute"
      />
      <TopbarItem
        title="Stats"
        icon={<ChartPie size="22" />}
        to="/dashboard/stats"
      />

      <TopbarItem
        title="Favourites"
        icon={<BookmarkOutline size="22" title="Check course material" />}
        to="/dashboard/favourites"
      />
      <TopbarItem
        title="Account"
        icon={<Cog size="22" />}
        exact
        to="/dashboard/account"
      />
      <TopbarItem title="Sign out" icon={<Logout size="22" />} to="/login" />

      <TopbarItem
        title="Get help"
        icon={<ContactSupport size="22" />}
        to="/dashboard/contact"
      /> */}
    </Container>
  )
}

export default Topbar
