// import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

// import { selectAllFavourites } from 'store/userSlice'

import TimetableCourseItem from './TimetableCourseItem'
import { cols, rows } from './timetableData'
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
    <Container>
      <TimetableLayout />

      {selectedCourses.map((courseCode, idx) => (
        <TimetableCourseItem
          key={courseCode}
          id={idx}
          courseCode={courseCode}
        />
      ))}
    </Container>
  )
}

export default TimetableContainer

/* Gridlines will need to be "named" in 24hr time
  Switch '1fr' to 'auto' if height of slot shouldnt be proportional to lecture length */

const Container = styled.div`
  display: grid;
  grid-template-rows:
    [tracks] auto
    ${rows.map(({ id, title }, index) => `[${id}] 1fr `)};
  grid-template-columns:
    [times] 4rem
    ${cols.map(({ id, title }, index) => `[${id}] 1fr `)};
  grid-column-gap: 2px;
  background: white;

  &::after {
    content: '';
    position: sticky;
    top: 3rem;
    z-index: 999;
    display: block;
    grid-row: tracks;
    grid-column: track-1 / -1;
    background-color: rgba(255, 255, 255, 0.9);
  }
`
