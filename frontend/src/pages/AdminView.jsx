import { Route, Switch, Redirect } from 'react-router-dom'
import { Dashboard } from 'hoc'
import Routes from 'RoutesConfig'

const menu = Routes.map((route, index) => {
  return route.component ? (
    <Route
      exact
      key={index}
      path={route.path}
      name={route.name}
      render={(props) => <route.component {...props} />}
    />
  ) : null
})

const AdminView = () => {
  return (
    <Dashboard>
      <Switch>
        {menu}
        <Redirect from="*" to="/404" />
      </Switch>
    </Dashboard>
  )
}

export default AdminView
