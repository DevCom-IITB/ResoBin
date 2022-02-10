import { Helmet } from 'react-helmet-async'

import { PageContainer } from 'components/shared'
import { TimetableContainerCustom } from 'components/Timetable'

const TimetableCustom = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>TimeTable - ResoBin</title>
        <meta
          property="description"
          content="IIT Bombay time table for selected courses"
        />
      </Helmet>

      <TimetableContainerCustom />
    </PageContainer>
  )
}

export default TimetableCustom
