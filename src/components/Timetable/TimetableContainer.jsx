// import { useSelector } from 'react-redux'

// import { selectAllFavourites } from 'store/userSlice'

import CurrentTime from './CurrentTime'
import TimetableCourseItem from './TimetableCourseItem'
import TimetableLayout from './TimetableLayout'

const selectedCourses = [
  'CL 232',
  'CL 305',
  'CL 319',
  'CL 324',
  // 'CL 333',
  'EE 101',
  'CS 663',
  'IE 643',
]

const TimetableContainer = () => {
  // const selectedCourses = useSelector(selectAllFavourites)

  return (
    <TimetableLayout>
      {/* {selectedCourses.map((courseCode, idx) => (
        <TimetableCourseItem
          key={courseCode}
          colorCode={idx}
          courseCode={courseCode}
        />
      ))} */}
      <CurrentTime />
    </TimetableLayout>
  )
}

export default TimetableContainer
