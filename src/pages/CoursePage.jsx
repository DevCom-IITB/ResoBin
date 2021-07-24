import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { CoursePageBody } from 'components/courses/course-page'
import { selectCourseListByCourseCode } from 'store/courseSlice'
import { device } from 'styles/responsive'

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`

const CoursePage = ({ match }) => {
  const { courseCode } = useParams()
  const courseMatches = useSelector(selectCourseListByCourseCode(courseCode))

  if (courseMatches.length !== 1) return <Redirect to="/404" />
  const courseData = courseMatches[0]

  return (
    <Container>
      <Helmet>
        <title>{`${courseData.Code} ${courseData.Title} - ResoBin`}</title>
        <meta property="description" content={courseData.Description} />
      </Helmet>

      <CoursePageBody data={courseData} />
    </Container>
  )
}

export default CoursePage
