import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Menu } from 'components/menu'
import routes from 'config/Routes'
import { ScrollToTop } from 'hoc'
import { getCourseList } from 'store/courseSlice'

const Content = () => {
  return (
    <Switch>
      {routes.map(
        (route) =>
          route.component && (
            <Route
              exact
              key={route.name}
              path={route.path}
              component={route.component}
            />
          )
      )}

      <Redirect from="*" to="/404" />
    </Switch>
  )
}

const Dashboard = () => {
  // get course list from the backend when user opens the app
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCourseList())
  }, [dispatch])

  return (
    <ScrollToTop>
      <Menu />
      <Content />
    </ScrollToTop>
  )
}

export default Dashboard
