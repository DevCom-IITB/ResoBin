import { Menu } from 'components/menu'
import { ScrollToTop } from 'hoc'
import { DashboardRoutes } from 'routes'

const Dashboard = () => {
  return (
    <ScrollToTop>
      <Menu />
      <DashboardRoutes />
    </ScrollToTop>
  )
}

export default Dashboard
