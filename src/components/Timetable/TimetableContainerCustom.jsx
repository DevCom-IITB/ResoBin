import { Aside, PageHeading, PageTitle } from 'components/shared'
import { useQueryString } from 'hooks'

import CurrentTime from './CurrentTime'
import TimetableCourseItem from './TimetableCourseItem'
import TimetableLayout from './TimetableLayout'

const TimetableContainerCustom = () => {
  const { getQueryString } = useQueryString()
  const coursesJSON = getQueryString('id')
  const courseTimetableList = JSON.parse(coursesJSON)

  return (
    <>
      <PageHeading>
        <PageTitle>Timetable (Shared)</PageTitle>
      </PageHeading>
      <TimetableLayout>
        {courseTimetableList.map((item) => (
          <TimetableCourseItem key={item.id} data={item} />
        ))}

        <CurrentTime mode="vertical" />
      </TimetableLayout>

      <Aside />
    </>
  )
}

export default TimetableContainerCustom
