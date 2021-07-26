import { Menu } from 'components/menu'
import { useScrollToTop } from 'hooks'
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
