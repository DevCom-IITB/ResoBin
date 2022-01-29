import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { getAuthStatusAction, selectIsAuthenticated } from 'store/authSlice'

const isInvalidRoute = (path) => {
  const ignore = ['/api', '/admin']
  const matches = ignore.some((ignorePath) => path.startsWith(ignorePath))

  return matches
}

const PrivateRoute = ({ component: RouteComponent, redirectTo }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(getAuthStatusAction())
  }, [dispatch])

  if (isAuthenticated === null || isInvalidRoute(location.pathname)) return null
  if (isAuthenticated) return <RouteComponent />

  return (
    <Navigate
      to={redirectTo}
      replace
      state={{
        from: location.pathname + location.search + location.hash,
      }}
    />
  )
}

export default PrivateRoute
