import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import {
  // selectAllTimetable,
  selectAllFavourites,
} from 'store/userSlice'

import CurrentTime from './CurrentTime'
import TimetableCourseItem from './TimetableCourseItem'
import TimetableLayout from './TimetableLayout'

// const selectedCourses = [
//   'CL232',
//   'CL305',
//   'CL319',
//   'CL324',
//   'EE101',
//   'CS663',
//   'IE643',
//   'CL 333',
// ]

const TimetableContainer = () => {
  const selectedCourses = useSelector(selectAllFavourites)

  return (
    <Container>
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
    </Container>
  )
}

export default TimetableContainer

const Container = styled.div`
  margin: 0.5rem 0.75rem;
`
