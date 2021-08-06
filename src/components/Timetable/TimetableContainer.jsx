import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { selectAllTimetable } from 'store/userSlice'

import CurrentTime from './CurrentTime'
import TimetableCourseItem from './TimetableCourseItem'
import TimetableLayout from './TimetableLayout'

const TimetableContainer = () => {
  const selectedCourses = useSelector(selectAllTimetable)
  const sem = 'autumn'

  return (
    <Container>
      <TimetableLayout>
        {selectedCourses[sem].map((courseCode, idx) => (
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
