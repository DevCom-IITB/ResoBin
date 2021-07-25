import { Menu } from 'components/menu'
import { ScrollToTop, useScrollToTop } from 'hoc/ScrollToTop'
import { DashboardRoutes } from 'routes'

const Dashboard = () => {
  // useScrollToTop()

  return (
    <ScrollToTop>
      <Menu />
      <DashboardRoutes />
    </ScrollToTop>
  )
}

export default Dashboard
