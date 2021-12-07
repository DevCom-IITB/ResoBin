import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

  const loading = [
    useSelector(selectCourseAPILoading),
    useSelector(selectAuthLoading),
  ].includes(true)

  if (loading) return <LoaderAnimation fixed />

  return <DashboardRoutes />
}

export default Dashboard
