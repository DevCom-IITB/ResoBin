import { Helmet } from 'react-helmet-async'

import { PageContainer, PageHeading, PageTitle } from 'components/shared'
import { TimetableContainer } from 'components/Timetable'

const TimeTable = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>TimeTable - ResoBin</title>
        <meta
          property="description"
          content="IIT Bombay time table for selected courses"
        />
      </Helmet>

      <PageHeading>
        <PageTitle>Timetable</PageTitle>
      </PageHeading>

      <TimetableContainer />
    </PageContainer>
  )
}

export default TimeTable
