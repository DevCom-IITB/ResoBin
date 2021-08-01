import { tracks, rows } from './timeTableData'
import TimeTableLectureItem from './TimeTableLectureItem'

const TimeTableSelectedCourses = () => {
  return (
    <>
      <TimeTableLectureItem
        title="CL 152"
        track={tracks[0]}
        row={{ start: rows[0], end: rows[2] }}
      />

      <TimeTableLectureItem
        title="EE 101"
        track={tracks[2]}
        row={{ start: rows[1], end: rows[3] }}
      />
    </>
  )
}

export default TimeTableSelectedCourses
