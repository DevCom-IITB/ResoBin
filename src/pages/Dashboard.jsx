import { Header } from 'components/header'
import { LoaderAnimation } from 'components/shared'
import Sidebar from 'components/sidebar'
import Topbar from 'components/sidebar/mobile/Topbar'
import { useViewportContext } from 'context/ViewportContext'
import { ScrollToTop } from 'hoc'
import { Suspense } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import Routes from 'RoutesConfig'

const menu = (url) =>
  Routes.map(
    (route, index) =>
      route.component && (
        <Route
          exact
          key={route.slug}
          path={url + route.slug}
          render={(props) => <route.component {...props} />}
        />
      )
  )

const Content = ({ url }) => {
  return (
    <Suspense fallback={<LoaderAnimation />}>
      <Switch>
        {menu(url)}
        <Redirect from="*" to="/404" />
      </Switch>
    </Suspense>
  )
}

const Dashboard = () => {
  const { url } = useRouteMatch()
  const { width } = useViewportContext()
  const breakpoint = 992

  return (
    <ScrollToTop>
      <Header />
      {width < breakpoint ? <Topbar /> : <Sidebar />}
      <Content url={url} />
    </ScrollToTop>
  )
}

export default Dashboard
