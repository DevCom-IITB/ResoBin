import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const scrollToTop = () => window.scrollTo(0, 0)

export const scrollToHash = (hash) => {
  const ele = document.getElementById(hash.slice(1)) // Hash string contains the '#' character
  if (ele) ele.scrollIntoView(true)
}

export const ScrollToTop = ({ children }) => {
  const history = useHistory()

  useEffect(() => {
    history.listen(scrollToTop)
  }, [history])

  return children
}

export const useScrollToTop = () => {
  const { hash } = useLocation()

  useEffect(() => (hash ? scrollToHash(hash) : scrollToTop()), [hash])
}

export default useScrollToTop
