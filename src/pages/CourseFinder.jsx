import axios from 'axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { CourseBody } from 'components/courses/course-finder'
import { LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
import {
  getCourseList,
  getCourseSlots,
  selectChecksum,
  selectCourseAPILoading,
  updateChecksum,
} from 'store/courseSlice'
import { device } from 'styles/responsive'

// ? get course list from the backend when user opens the app
// * download the courses and cache them in the redux store
// * then render the courses
// * when user clicks on a course, load the course details
// * when user goes back to the courses, get the checksum of the courses
// * if the checksum is different, reload the courses
// * if the checksum is the same, render the courses
// * if the checksum is not available, reload the courses

const CourseFinder = () => {
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

  return (
    <Container>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>
      {(loadingAPI || loading) && <LoaderAnimation fixed />}

      <CourseBody />
    </Container>
  )
}

export default CourseFinder

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`
