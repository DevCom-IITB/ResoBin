import { Helmet } from 'react-helmet-async'

import { PageContainer } from 'components/shared'
import { TimetableContainer } from 'components/Timetable'
import ReminderPlanner from 'components/Timetable/eplanner_reminder'
import ExamPlanner from 'components/Timetable/eplanner_Exam'
import PersonalPlanner from 'components/Timetable/eplanner_personal' 
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
      <ReminderPlanner />
      <ExamPlanner />
    </PageContainer>
  )
}

export default TimeTable
