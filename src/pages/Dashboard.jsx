import { useEffect, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Menu } from 'components/menu'
import routes from 'config/Routes'
import { ScrollToTop } from 'hoc'
import { getCourseList } from 'store/courseSlice'

// lazy load the pages when called
const Home = lazy(() => import('pages/Home'))
const Courses = lazy(() => import('pages/Courses'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))
const Favourites = lazy(() => import('pages/Favourites'))
const Settings = lazy(() => import('pages/Settings'))

// IMPORTANT: Remember to update any route changes on the sitemap
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/courses" component={Courses} /> */}
      <Route exact path="/courses/:courseCode?" component={Courses} />
      <Route exact path="/contribute" component={Contribute} />
      <Route exact path="/favourites" component={Favourites} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/contact" component={Contact} />

      {/* {routes.map(
        (route) =>
          route.component && (
            <Route
              exact
              key={route.name}
              path={route.path}
              component={route.component}
            />
          )
      )} */}

      {/* 404 page */}
      <Redirect to="/404" />
    </Switch>
  )
}

const Dashboard = () => {
  // get course list from the backend when user opens the app
  const dispatch = useDispatch()
  useEffect(() => dispatch(getCourseList()), [dispatch])

  return (
    <ScrollToTop>
      <Menu />
      <Routes />
    </ScrollToTop>
  )
}

export default Dashboard
