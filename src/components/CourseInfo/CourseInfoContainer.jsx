import { Empty } from 'antd'

import { Aside, PageSubtitle, PageHeading, PageTitle } from 'components/shared'

const CourseInfoContainer = () => {
  return (
    <>
      <PageHeading>
        <PageTitle>Course Info Booklet</PageTitle>
      </PageHeading>

      <Aside title="SSS Team">
        <Empty description={<PageSubtitle>Coming soon!</PageSubtitle>} />
      </Aside>
    </>
  )
}

export default CourseInfoContainer
