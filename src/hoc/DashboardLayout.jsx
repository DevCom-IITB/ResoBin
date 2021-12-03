import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Outlet } from 'react-router-dom'

import { Menu } from 'components/menu'
import { LoaderAnimation } from 'components/shared'
import { PageTransition } from 'hoc'
import { useScrollToTop } from 'hooks'
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

  if (loadingAPI.includes(true)) return <LoaderAnimation fixed />

  return (
    <>
      <Menu />

      {/* Add transition effect to route changes */}
      <PageTransition page={page}>
        <Outlet />
      </PageTransition>
    </>
  )
}

export default Dashboard
