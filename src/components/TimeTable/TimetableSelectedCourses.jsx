import { tracks, rows } from './timetableData'
import TimetableLectureItem from './TimetableLectureItem'

const TimeTableSelectedCourses = () => {
  return (
    <>
      <TimetableLectureItem
        title="CL 152"
        track={tracks[0]}
        row={{ start: rows[0], end: rows[2] }}
      />

      <TimetableLectureItem
        title="EE 101"
        track={tracks[2]}
        row={{ start: rows[1], end: rows[3] }}
      />
    </>
  )
}

export default TimeTableSelectedCourses
