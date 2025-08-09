import { Helmet } from 'react-helmet-async'

import { PageContainer } from 'components/shared'
import { TimetableContainer } from 'components/Timetable'
import PersonalPlanner from 'components/Timetable/eplanner' 
import { Exam } from 'components/Timetable/ExamTimetable'

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
      <Exam />
      <PersonalPlanner />
    </PageContainer>
  )
}

export default TimeTable
