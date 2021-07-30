import { useLocation } from 'react-router-dom'

import { Menu } from 'components/menu'
import PageTransition from 'hoc/PageTransition'
import { useScrollToTop } from 'hooks'
import { DashboardRoutes } from 'routes'

const Dashboard = () => {
  useScrollToTop()
  const location = useLocation()
  const page = location.pathname.split('/')[1] || '/'

  return (
    <>
      <Menu />
      <PageTransition page={page}>
        <DashboardRoutes />
      </PageTransition>
    </>
  )
}

export default Dashboard
