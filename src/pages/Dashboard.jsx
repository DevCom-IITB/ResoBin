import { Header } from 'components/header'
import { MenuHorizontal, MenuVertical } from 'components/menu'
import { LoaderAnimation } from 'components/shared'
import { useViewportContext } from 'context/ViewportContext'
import { breakpoints } from 'styles/responsive'
import { ScrollToTop } from 'hoc'
import { Suspense } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import Routes from 'RoutesConfig'

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
