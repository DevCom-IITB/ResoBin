import { useSelector } from 'react-redux'

import { cols, rows, slots } from 'data/timetable'
import { selectCourseSlotsByCourseCode } from 'store/courseSlice'

import TimetableCourseLectureItem from './TimetableCourseLectureItem'

// * id refers to the color of the timetable item
const TimetableCourseItem = ({ courseCode, colorCode = 0 }) => {
  // console.log(courseCode)
  let courseSlots = useSelector(selectCourseSlotsByCourseCode(courseCode))
  if (!courseSlots) return null
  courseSlots = courseSlots.map((slot) => slots[slot])

  return (
    <>
      {courseSlots.map(({ row, col }) => (
        <TimetableCourseLectureItem
          key={col}
          colorCode={colorCode}
          title={courseCode}
          gridCol={cols[col - 1]}
          gridRow={{ start: rows[row.start], end: rows[row.end] }}
        />
      ))}
    </>
  )
}

export default TimetableCourseItem
