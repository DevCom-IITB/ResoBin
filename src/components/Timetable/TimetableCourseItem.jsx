import { useSelector } from 'react-redux'

import { cols, rows, slots } from 'data/timetable'
import {
  selectCourseSlotsByCourseCode,
  selectCourseListByCourseCode,
} from 'store/courseSlice'

import TimetableCourseLectureItem from './TimetableCourseLectureItem'

// * id refers to the color of the timetable item
const TimetableCourseItem = ({ courseCode, colorCode = 0 }) => {
  const courseData = useSelector(selectCourseListByCourseCode(courseCode))

  let courseSlots = useSelector(selectCourseSlotsByCourseCode(courseCode))
  if (!courseSlots) return null
  courseSlots = courseSlots.map((slot) => slots[slot])

  return (
    <>
      {courseSlots.map(({ row, col }, idx) => (
        <TimetableCourseLectureItem
          key={String(idx)}
          colorCode={colorCode}
          courseData={courseData}
          gridCol={cols[col - 1]}
          gridRow={{ start: rows[row.start], end: rows[row.end] }}
        />
      ))}
    </>
  )
}

export default TimetableCourseItem
