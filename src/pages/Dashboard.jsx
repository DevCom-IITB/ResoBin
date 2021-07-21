import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Menu } from 'components/menu'
import { ScrollToTop } from 'hoc'
import { DashboardRoutes } from 'routes'
import { getCourseList } from 'store/courseSlice'

const Dashboard = () => {
  // get course list from the backend when user opens the app
  const dispatch = useDispatch()
  useEffect(() => dispatch(getCourseList()), [dispatch])

  return (
    <ScrollToTop>
      <Menu />
      <DashboardRoutes />
    </ScrollToTop>
  )
}

export default Dashboard
