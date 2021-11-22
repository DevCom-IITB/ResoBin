import { Helmet } from 'react-helmet-async'

import CourseFinderContainer from 'components/CourseFinder/CourseContainer'
import { PageContainer } from 'components/shared'

const CourseFinder = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

      <CourseFinderContainer />
    </PageContainer>
  )
}

export default CourseFinder
