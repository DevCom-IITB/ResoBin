import { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { selectTracking } from 'store/settingsSlice'

const usePageTracking = () => {
  const location = useLocation()
  const [allow, setAllow] = useState(false)
  const permitTracking = useSelector(selectTracking)

  useEffect(() => {
    if (
      permitTracking &&
      process.env.NODE_ENV === 'production' &&
      process.env.REACT_APP_GA_TRACKING_ID
    ) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
      setAllow(true)
    } else {
      setAllow(false)
    }
  }, [permitTracking])

  useEffect(() => {
    if (allow) {
      ReactGA.pageview(location.pathname + location.search + location.hash)
    }
  }, [allow, location.pathname, location.search, location.hash])
}

export default usePageTracking
