import { useSelector } from 'react-redux'

import { selectAllTimetable } from 'store/userSlice'

import CurrentTime from './CurrentTime'
import TimetableCourseItem from './TimetableCourseItem'
import TimetableLayout from './TimetableLayout'

// const selectedCourses = [
//   'CL232',
//   'CL305',
//   'CL319',
//   'CL324',
//   'CL 333',
//   'EE101',
//   'CS663',
//   'IE643',
// ]

const TimetableContainer = () => {
  const selectedCourses = useSelector(selectAllTimetable)

  return (
    <TimetableLayout>
      {selectedCourses.map((courseCode, idx) => (
        <TimetableCourseItem
          key={courseCode}
          colorCode={idx}
          courseCode={courseCode}
        />
      ))}

      <CurrentTime mode="vertical" />
    </TimetableLayout>
  )
}

export default TimetableContainer
