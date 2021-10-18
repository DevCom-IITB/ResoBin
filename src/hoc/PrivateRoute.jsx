import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

import { getAuthStatusAction } from 'store/authSlice'

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuthStatusAction())
  }, [dispatch])

  return (
    isAuthenticated !== null && (
      <Route
        {...routeProps}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from:
                    props.location.pathname +
                    props.location.search +
                    props.location.hash,
                },
              }}
            />
          )
        }
      />
    )
  )
}

export default PrivateRoute
