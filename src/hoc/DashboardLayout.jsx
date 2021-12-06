import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Menu } from 'components/menu'
import { LoaderAnimation } from 'components/shared'
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
      <DashboardRoutes />
    </>
  )
}

export default Dashboard
