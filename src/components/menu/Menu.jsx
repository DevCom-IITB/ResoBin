import {
  BookOpen,
  CloudUpload,
  Cog,
  Home,
  Bookmark as BookmarkOutline,
} from '@styled-icons/heroicons-outline'
import { ContactSupport } from '@styled-icons/material-outlined'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import ProfileImage from 'assets/images/ProfileImg_Laxman.jpg'
import { MenuItem, ProfileImgItem } from 'components/menu'
import { Divider } from 'components/shared'
import { useViewportContext } from 'context/ViewportContext'
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
    width: ${({ theme }) => theme.navbarHorizontalWidth};
    height: calc(100% - 3rem);
    padding: 0;
  }
`

const Menu = () => {
  // mobile devices horizontal menu & desktops vertical menu
  const { width } = useViewportContext()
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    setIsDesktop(width >= breakpoints.md)
  }, [width])

  const iconSize = isDesktop ? '1.125rem' : '1.5rem'

  return (
    <Container>
      <MenuItem title="Home" icon={Home} iconSize={iconSize} to="/" />
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

      {isDesktop && <Divider margin="1rem 0" />}
      {isDesktop && <ProfileImgItem title="Laxman D." src={ProfileImage} />}

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
