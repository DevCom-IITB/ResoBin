import { Suspense } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { DashboardLayout } from 'components/dashboard'
import { LoaderAnimation } from 'components/shared'
import Routes from 'RoutesConfig'

const menu = (url) =>
  Routes.map(
    (route, index) =>
      route.component && (
        <Route
          exact
          key={index}
          path={url + route.slug}
          render={(props) => <route.component {...props} />}
        />
      )
  )

const AdminView = () => {
  let { url } = useRouteMatch()
  return (
    <DashboardLayout>
      <Suspense fallback={<LoaderAnimation />}>
        <Switch>
          {menu(url)}
          <Redirect from="*" to="/404" />
        </Switch>
      </Suspense>
    </DashboardLayout>
  )
}

export default AdminView
