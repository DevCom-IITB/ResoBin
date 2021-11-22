import { useEffect, useState } from 'react'

import { breakpoints } from 'styles/responsive'

const useResponsive = () => {
  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  // TODO: Rename and improve this
  return {
    height,
    width,
    isMobileS: width < breakpoints.xs,
    isMobile: width < breakpoints.md,
    isTablet: width < breakpoints.lg && width >= breakpoints.md,
    isDesktop: width >= breakpoints.lg,
  }
}

export default useResponsive
