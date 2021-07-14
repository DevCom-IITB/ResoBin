import { Suspense } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { Header } from 'components/header'
import { MenuHorizontal, MenuVertical } from 'components/menu'
import { LoaderAnimation } from 'components/shared'
import { useViewportContext } from 'context/ViewportContext'
import { ScrollToTop } from 'hoc'
import Routes from 'RoutesConfig'
import { breakpoints } from 'styles/responsive'

const Content = () => {
  const { url } = useRouteMatch()

  return (
    <Suspense fallback={<LoaderAnimation />}>
      <Switch>
        {Routes.map(
          (route, index) =>
            route.component && (
              <Route
                exact
                key={route.slug}
                path={url + route.slug}
                render={(props) => <route.component {...props} />}
              />
            )
        )}
        <Redirect from="*" to="/404" />
      </Switch>
    </Suspense>
  )
}

const Dashboard = () => {
  const { width } = useViewportContext()

  return (
    <ScrollToTop>
      <Header dashboard />
      {width < breakpoints.md ? <MenuHorizontal /> : <MenuVertical />}
      <Content />
    </ScrollToTop>
  )
}

export default Dashboard
