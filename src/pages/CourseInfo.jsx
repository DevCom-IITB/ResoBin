import { Helmet } from 'react-helmet-async'

import { CourseInfoContainer } from 'components/CourseInfo'
import { PageContainer } from 'components/shared'

const CourseInfo = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Course Info - ResoBin</title>
        <meta name="description" content="Course Information at IIT Bombay" />
      </Helmet>
      <CourseInfoContainer />
    </PageContainer>
  )
}

export default CourseInfo
