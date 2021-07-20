import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Header } from 'components/header'
import { MenuHorizontal, MenuVertical } from 'components/menu'
import routes from 'config/Routes'
import { useViewportContext } from 'context/ViewportContext'
import { ScrollToTop } from 'hoc'
import { getCourseList } from 'store/courseSlice'
import { breakpoints } from 'styles/responsive'

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
  const { width } = useViewportContext()
  // get course list from the backend when user opens the app
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCourseList())
  }, [dispatch])

  return (
    <ScrollToTop>
      <Header dashboard />
      {width < breakpoints.md ? <MenuHorizontal /> : <MenuVertical />}
      <Content />
    </ScrollToTop>
  )
}

export default Dashboard
