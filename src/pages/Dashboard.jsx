import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Menu } from 'components/menu'
import { LoaderAnimation } from 'components/shared'
import PageTransition from 'hoc/PageTransition'
import { useScrollToTop } from 'hooks'
import { DashboardRoutes } from 'routes'
import { selectAuthLoading } from 'store/authSlice'
import {
  getDepartmentList,
  getSemesterList,
  getCourseListMinified,
  selectCourseAPILoading,
} from 'store/courseSlice'
import { getProfileAction } from 'store/userSlice'

const Dashboard = () => {
  useScrollToTop()
  const location = useLocation()
  const page = location.pathname.split('/')[1] || '/'
  const dispatch = useDispatch()

  useEffect(() => {
    // ? Fetch user profile
    dispatch(getProfileAction())
    dispatch(getDepartmentList())
    dispatch(getSemesterList())
    dispatch(getCourseListMinified())
  }, [dispatch])

  const loadingAPI = [
    useSelector(selectCourseAPILoading),
    useSelector(selectAuthLoading),
  ]

  return loadingAPI.includes(true) ? (
    <LoaderAnimation fixed />
  ) : (
    <>
      <Menu />

      {/* Add transition effect to route changes */}
      <PageTransition page={page}>
        <DashboardRoutes />
      </PageTransition>
    </>
  )
}

export default Dashboard
