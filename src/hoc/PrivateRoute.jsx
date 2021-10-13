import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'

import { getAuthStatusAction } from 'store/authSlice'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const route = useLocation().pathname

  useEffect(() => {
    dispatch(getAuthStatusAction())
  }, [dispatch])

  return (
    isAuthenticated !== null && (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={`/login?redirect=${encodeURIComponent(route)}`} />
          )
        }
      />
    )
  )
}

export default PrivateRoute
