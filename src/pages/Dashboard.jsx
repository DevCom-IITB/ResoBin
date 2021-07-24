import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Menu } from 'components/menu'
import { LoaderAnimation } from 'components/shared'
import { ScrollToTop } from 'hoc'
import { DashboardRoutes } from 'routes'
import { getCourseList, selectCourseAPILoading } from 'store/courseSlice'

const Dashboard = () => {
  // get course list from the backend when user opens the app
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCourseList())
  }, [dispatch])
  const loading = useSelector(selectCourseAPILoading)

  return loading ? (
    <LoaderAnimation />
  ) : (
    <ScrollToTop>
      <Menu />
      <DashboardRoutes />
    </ScrollToTop>
  )
}

export default Dashboard
