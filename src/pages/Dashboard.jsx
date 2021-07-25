import { Menu } from 'components/menu'
import { useScrollToTop } from 'hoc/ScrollToTop'
import { DashboardRoutes } from 'routes'

const Dashboard = () => {
  useScrollToTop()

  return (
    <>
      <Menu />
      <DashboardRoutes />
    </>
  )
}

export default Dashboard
