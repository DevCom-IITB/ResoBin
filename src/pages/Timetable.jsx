import React, { useState,useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { PageContainer } from 'components/shared'
import TimetableContainer from 'components/Timetable/TimetableContainer'

// import ReminderPlanner from 'components/Timetable/eplanner_reminder'
// import ExamPlanner from 'components/Timetable/eplanner_Exam'
// import PersonalPlanner from 'components/Timetable/eplanner_personal' 
// import { Exam } from 'components/Timetable/ExamTimetable'
// import { Exam(( } from 'components/Timetable/ExamTimetable' 
const TimeTable=()=> 
{return (
    <PageContainer>
      <Helmet>
        <title>TimeTable - ResoBin</title>
      </Helmet>

    <TimetableContainer/>
    </PageContainer>
  )

}
export default TimeTable
