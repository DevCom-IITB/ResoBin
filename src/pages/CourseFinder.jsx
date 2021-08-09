import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

import { CourseBody } from 'components/CourseFinder'
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
  return (
    <Container>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

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
