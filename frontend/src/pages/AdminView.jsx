import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { Dashboard } from 'hoc'
import Routes from 'RoutesConfig'

const menu = (url) =>
  Routes.map(
    (route) =>
      route.component && (
        <Route
          exact
          path={url + route.slug}
          render={(props) => <route.component {...props} />}
        />
      )
  )

const AdminView = () => {
  let { url } = useRouteMatch()
  return (
    <Dashboard>
      <Switch>
        {menu(url)}
        <Redirect from="*" to="/404" />
      </Switch>
    </Dashboard>
  )
}

export default AdminView
