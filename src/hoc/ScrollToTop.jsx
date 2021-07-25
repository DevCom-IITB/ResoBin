import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const scrollToTop = () => window.scrollTo(0, 0)

export const scrollToHash = (hash) => {
  const ele = document.getElementById(hash.slice(1)) // Hash string contains the '#' character
  if (ele) ele.scrollIntoView(true)
}

export const useScrollToTop = () => {
  const { hash } = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (hash) scrollToHash(hash)
    else history.listen(scrollToTop)
  }, [history, hash])
}

export default useScrollToTop
