import { useSelector } from 'react-redux'

import { selectAllFavourites } from 'store/userSlice'

import TimetableCourseItem from './TimetableCourseItem'

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

const TimetableSelectedCourses = () => {
  // const selectedCourses = useSelector(selectAllFavourites)

  return (
    <>
      {selectedCourses.map((courseCode, idx) => (
        <TimetableCourseItem
          key={courseCode}
          id={idx}
          courseCode={courseCode}
        />
      ))}
    </>
  )
}

export default TimetableSelectedCourses
