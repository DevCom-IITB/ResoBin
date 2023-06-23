import { Aside, PageHeading, PageTitle } from 'components/shared'

import CourseInfoTopics from './CourseInfoTopics'
import Team from './Team'

const CourseInfoContainer = () => {
  return (
    <>
      <PageHeading>
        <PageTitle>Course Information</PageTitle>
      </PageHeading>

      <CourseInfoTopics />

      <Aside title="SSS Team">
        {/* <Empty description={<PageSubtitle>Coming soon!</PageSubtitle>} /> */}
        <Team />
      </Aside>
    </>
  )
}

export default CourseInfoContainer
