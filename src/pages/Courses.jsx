import styled from 'styled-components'
import {
  CourseList,
  Filters,
  PageNo,
  CourseSearchbar,
} from 'components/courses'

const Container = styled.div`
  margin: 4rem 0 0 11.5rem;
`

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 19rem;
`

const Courses = () => {
  return (
    <Container>
      <MiddleContainer>
        <CourseSearchbar />
        <CourseList />
        <PageNo />
      </MiddleContainer>
      <Filters />
    </Container>
  )
}

export default Courses
