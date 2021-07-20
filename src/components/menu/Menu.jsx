import {
  BookOpen,
  ChartPie,
  CloudUpload,
  Cog,
  Logout,
} from '@styled-icons/heroicons-outline'
import { ContactSupport } from '@styled-icons/material-outlined'
import { BookmarkOutline } from '@styled-icons/zondicons'
import styled from 'styled-components'

import ProfileImage from 'assets/images/ProfileImg_Laxman.jpg'
import { MenuItem, ProfileImgItem } from 'components/menu'
import { Divider } from 'components/shared'
import { device } from 'styles/responsive'

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

  @media ${device.min.md} {
    position: fixed;
    top: 3rem;
    z-index: 8; /* For shadow effects */
    flex-direction: column;
    justify-content: initial;
    width: ${({ theme }) => theme.navbarHorizontalWidth};
    height: calc(100% - 3rem);
    padding: 0;
  }
`

export const MenuHorizontal = () => {
  return (
    <Container>
      <MenuItem
        title="Courses"
        icon={<BookOpen size="1.5rem" />}
        to="/courses"
      />
      <MenuItem
        title="Contribute"
        icon={<CloudUpload size="1.5rem" />}
        to="/contribute"
      />

      <MenuItem
        title="Favourites"
        icon={<BookmarkOutline size="1.25rem" />}
        to="/favourites"
      />
      <MenuItem title="Settings" icon={<Cog size="1.5rem" />} to="settings" />
    </Container>
  )
}

export const MenuVertical = () => {
  return (
    <Container>
      <MenuItem title="Courses" icon={<BookOpen size="22" />} to="/courses" />
      <MenuItem
        title="Contribute"
        icon={<CloudUpload size="22" />}
        to="/contribute"
      />
      <MenuItem title="Stats" icon={<ChartPie size="22" />} to="/stats" />

      <Divider margin="1rem 0" />
      <ProfileImgItem title="Laxman D." src={ProfileImage} />

      <MenuItem
        title="Favourites"
        icon={<BookmarkOutline size="18" title="Check course material" />}
        to="/favourites"
      />
      <MenuItem
        title="Settings"
        icon={<Cog size="22" />}
        exact
        to="/settings"
      />
      <MenuItem title="Sign out" icon={<Logout size="22" />} to="/login" />

      <Divider margin="1rem 0" />
      <MenuItem
        title="Get help"
        icon={<ContactSupport size="20" />}
        to="/contact"
      />
    </Container>
  )
}
