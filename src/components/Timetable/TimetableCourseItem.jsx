import { useSelector } from 'react-redux'

import { selectCourseSlotsByCourseCode } from 'store/courseSlice'

import { tracks, rows, slots } from './timetableData'
import TimetableLectureItem from './TimetableLectureItem'

const TimetableCourseItem = ({ id, courseCode }) => {
  let courseSlots = useSelector(selectCourseSlotsByCourseCode(courseCode))
  courseSlots = courseSlots.map((slot) => slots[slot])

  return (
    <>
      {courseSlots.map(({ row, track }) => (
        <TimetableLectureItem
          id={id}
          title={courseCode}
          track={tracks[track - 1]}
          row={{ start: rows[row.start], end: rows[row.end] }}
        />
      ))}
    </>
  )
}

export default TimetableCourseItem
