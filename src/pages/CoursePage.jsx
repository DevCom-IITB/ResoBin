import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Redirect, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import {
  CoursePageBody,
  CoursePageBreadcrumbs,
} from 'components/courses/course-page'
import { coursePageUrl } from 'paths'
import { selectCourseListByCourseCode } from 'store/courseSlice'
import { device } from 'styles/responsive'

const CoursePage = ({ match }) => {
  const location = useLocation()
  const { courseCode } = useParams()
  const courseMatches = useSelector(selectCourseListByCourseCode(courseCode))

  if (courseMatches.length !== 1) return <Redirect to="/404" />
  const courseData = courseMatches[0]
  const title = `${courseData.Code}: ${courseData.Title}`

  // redirect to canonical URL (eg: courses/CL152/introduction-to-chemical-engineering)
  const canonicalUrl = coursePageUrl(courseData.Code, courseData.Title)
  if (match.url !== canonicalUrl)
    return <Redirect to={{ ...location, pathname: canonicalUrl }} />

  return (
    <Container>
      <Helmet>
        <title>{`${title} - ResoBin`}</title>
        <meta property="description" content={courseData.Description} />
      </Helmet>

      <CoursePageBreadcrumbs courseTitle={title} />

      <CoursePageBody courseData={courseData} />
    </Container>
  )
}

export default CoursePage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }

  @media ${device.min.xl} {
    padding-right: ${({ theme }) => theme.asideWidthRight};
    transition: padding-right 200ms ease-in;
  }
`
