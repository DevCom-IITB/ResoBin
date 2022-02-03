import { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom'

const usePageTracking = () => {
  const location = useLocation()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.REACT_APP_GA_TRACKING_ID
    ) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
    }

    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search)
    }
  }, [initialized, location])
}

export default usePageTracking
