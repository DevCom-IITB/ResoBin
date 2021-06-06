import { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Dashboard } from 'hoc'
import { Login, NotFound } from 'pages'

// Lazy load the pages when called
const Courses = lazy(() => import('pages/Courses'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))

const AdminView = () => {
  return (
    <Dashboard>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/contribute" component={Contribute} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route path="/404" component={NotFound} status={404} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Dashboard>
  )
}

export default AdminView
