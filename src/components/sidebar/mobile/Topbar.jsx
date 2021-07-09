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
import TopbarItem from 'components/sidebar/mobile/TopbarItem'
import styled from 'styled-components'

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 2rem;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
`

const Topbar = () => {
  return (
    <Container>
      <TopbarItem
        title="Courses"
        Icon={BookOpen}
        size="1.5rem"
        to="/dashboard/courses"
      />
      <TopbarItem
        title="Contribute"
        Icon={CloudUpload}
        size="1.5rem"
        to="/dashboard/contribute"
      />
      {/* <TopbarItem
        title="Stats"
        icon={<ChartPie size="22" />}
        to="/dashboard/stats"
      /> */}

      <TopbarItem
        title="Favourites"
        Icon={BookmarkOutline}
        size="1.25rem"
        to="/dashboard/favourites"
      />
      <TopbarItem
        title="Account"
        Icon={Cog}
        size="1.5rem"
        to="/dashboard/account"
      />
      {/* <TopbarItem title="Sign out" icon={<Logout size="22" />} to="/login" /> */}

      {/* <TopbarItem
        title="Get help"
        icon={<ContactSupport size="22" />}
        to="/dashboard/contact"
      /> */}

    </Container>
  )
}

export default Topbar
