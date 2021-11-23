import { Helmet } from 'react-helmet-async'

import { PageContainer } from 'components/shared'
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

      <TimetableContainer />
    </PageContainer>
  )
}

export default TimeTable
