import {
  BookOpen,
  CloudUpload,
  Cog,
  Calendar,
  Home,
  Bookmark as BookmarkOutline,
} from '@styled-icons/heroicons-outline'
import { ContactSupport } from '@styled-icons/material-outlined'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { MenuItem, ProfileImgItem } from 'components/menu'
import { Divider } from 'components/shared'
import { useViewportContext } from 'context/ViewportContext'
import { selectUserProfile } from 'store/authSlice'
import { device, breakpoints } from 'styles/responsive'

const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 1.5rem;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);

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

const Menu = () => {
  // mobile devices horizontal menu & desktops vertical menu
  const { width } = useViewportContext()
  const [isDesktop, setIsDesktop] = useState(true)

  const profile = useSelector(selectUserProfile)

  useEffect(() => {
    setIsDesktop(width >= breakpoints.md)
  }, [width])

  const iconSize = isDesktop ? '1.125rem' : '1.5rem'

  return (
    <Container>
      <MenuItem exact title="Home" icon={Home} iconSize={iconSize} to="/" />
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
      {isDesktop && (
        <MenuItem
          title="Contribute"
          icon={CloudUpload}
          iconSize={iconSize}
          to="/contribute"
        />
      )}

      {isDesktop && <Divider margin="1rem 0" />}
      {isDesktop && (
        <ProfileImgItem
          title={profile.name.split(' ')[0]}
          src={profile.profile_picture}
        />
      )}

      <MenuItem
        title="Favourites"
        icon={BookmarkOutline}
        iconSize={iconSize}
        to="/favourites"
      />
      <MenuItem
        title="Settings"
        icon={Cog}
        iconSize={iconSize}
        to="/settings"
      />

      {isDesktop && <Divider margin="1rem 0" />}
      {isDesktop && (
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
