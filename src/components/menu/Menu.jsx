import {
  BookOpen,
  CloudUpload,
  Cog,
  Calendar,
  Home,
  Bookmark,
} from '@styled-icons/heroicons-outline'
import { ContactSupport } from '@styled-icons/material-outlined'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { MenuItem, ProfileImgItem } from 'components/menu'
import { Divider } from 'components/shared'
import { useResponsive } from 'hooks'
import { selectUserProfile } from 'store/userSlice'
import { device } from 'styles/responsive'

const Menu = () => {
  // ? mobile devices horizontal menu & desktops vertical menu
  const profile = useSelector(selectUserProfile)
  const { isMobile } = useResponsive()
  const iconSize = isMobile ? '1.5rem' : '1.125rem'

  return (
    <Container>
      <MenuItem title="Home" icon={Home} iconSize={iconSize} to="/" />
      <MenuItem
        title="Timetable"
        icon={Calendar}
        iconSize={iconSize}
        to="/timetable"
      />
      <MenuItem
        title="Courses"
        icon={BookOpen}
        iconSize={iconSize}
        to="/courses"
      />

      <MenuItem
        title="Contribute"
        icon={CloudUpload}
        iconSize={iconSize}
        to="/contribute"
      />

      {isMobile || <Divider margin="1rem 0" />}
      {isMobile || (
        <ProfileImgItem
          title={profile?.name?.split(' ')?.[0]}
          src={profile?.profilePicture}
        />
      )}

      <MenuItem
        title="Favourites"
        icon={Bookmark}
        iconSize={iconSize}
        to="/favourites"
      />
      <MenuItem
        title="Settings"
        icon={Cog}
        iconSize={iconSize}
        to="/settings"
      />

      {isMobile || <Divider margin="1rem 0" />}
      {isMobile || (
        <MenuItem
          title="Get help"
          icon={ContactSupport}
          iconSize={iconSize}
          to="/contact"
        />
      )}
    </Container>
  )
}

export default Menu

const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding: 0 1.5rem;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 50%);

  @media ${device.min.md} {
    position: fixed;
    top: 3rem;
    z-index: 8; /* For shadow effects */
    flex-direction: column;
    justify-content: initial;
    width: ${({ theme }) => theme.asideWidthLeft};
    height: calc(100% - 3rem);
    padding: 0;
  }
`
