import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ? hash does not work yet
export const scrollToHash = (hash) => {
  // ? hash string contains the '#' character
  const element = document.getElementById(hash.slice(1))
  if (element) element.scrollIntoView()
}

export const useScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) scrollToHash(location.hash)
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash, location.search])
}

export default useScrollToTop
