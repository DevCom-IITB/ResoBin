import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

import CourseFinderContainer from 'components/CourseFinder/CourseContainer'
import { device } from 'styles/responsive'

const CourseFinder = () => {
  return (
    <Container>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

      <CourseFinderContainer />
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
