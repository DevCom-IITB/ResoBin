import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Menu } from 'components/menu'
import { LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
import PageTransition from 'hoc/PageTransition'
import { useScrollToTop } from 'hooks'
import { DashboardRoutes } from 'routes'
import {
  getCourseList,
  getCourseSlots,
  selectChecksum,
  selectCourseAPILoading,
  updateChecksum,
} from 'store/courseSlice'

const Dashboard = () => {
  useScrollToTop()
  const location = useLocation()
  const page = location.pathname.split('/')[1] || '/'
  const dispatch = useDispatch()
  const checksum = useSelector(selectChecksum)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getChecksum = async (prevChecksum) =>
      axios
        .get('https://run.mocky.io/v3/636b71c3-8b79-424b-b946-9ad314441c9f')
        .then(({ data }) => {
          if (data.checksum !== prevChecksum) {
            dispatch(updateChecksum(data))
            dispatch(getCourseList())
            dispatch(getCourseSlots())
          }
          return setLoading(false)
        })
        .catch((error) => {
          toastError(error.message)
        })

    setLoading(true)
    getChecksum(checksum)
  }, [checksum, dispatch])

  const loadingAPI = useSelector(selectCourseAPILoading)

  return loadingAPI || loading ? (
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
