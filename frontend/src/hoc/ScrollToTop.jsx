import { useEffect } from 'react'
import { withRouter } from 'react-router'

const ScrollToTop = ({ history, children }) => {
  useEffect(() => history.listen(() => window.scrollTo(0, 0)), [history])
  return children
}

export default withRouter(ScrollToTop)
