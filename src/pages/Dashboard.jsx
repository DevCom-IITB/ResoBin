import { Menu } from 'components/menu'
import { useScrollToTop } from 'hooks'
import { DashboardRoutes } from 'routes'

const Dashboard = (props) => {
  useScrollToTop()

  return (
    <>
      <Menu />
      <DashboardRoutes {...props} />
    </>
  )
}

export default Dashboard
