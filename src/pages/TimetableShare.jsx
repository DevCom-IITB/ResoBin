import { Helmet } from 'react-helmet-async'

import { PageContainer } from 'components/shared'
import { TimetableShareContainer } from 'components/Timetable'

const TimetableShare = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>TimeTable (shared) - ResoBin</title>
        <meta
          property="description"
          content="IIT Bombay timetable for selected courses"
        />
      </Helmet>

      <TimetableShareContainer />
    </PageContainer>
  )
}

export default TimetableShare
