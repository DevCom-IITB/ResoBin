import { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { PrivateRoute } from 'hoc'

// lazy load the pages when called
const Dashboard = lazy(() => import('pages/Dashboard'))
const Login = lazy(() => import('pages/Login'))
const NotFound = lazy(() => import('pages/NotFound'))

const Home = lazy(() => import('pages/Home'))
const Courses = lazy(() => import('pages/Courses'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))
const Favourites = lazy(() => import('pages/Favourites'))
const Settings = lazy(() => import('pages/Settings'))

// authentication necessary for all routes
export const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses" component={Courses} />
      <Route exact path="/courses/:courseCode" component={Courses} />
      <Route exact path="/contribute" component={Contribute} />
      <Route exact path="/favourites" component={Favourites} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/contact" component={Contact} />

      {/* 404 page */}
      <Redirect to="/404" />
    </Switch>
  )
}

// IMPORTANT: Remember to update any route changes on the sitemap
export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/404" component={NotFound} />
      <PrivateRoute path="/" component={Dashboard} />

      {/* 404 page */}
      <Route component={NotFound} />
    </Switch>
  )
}
