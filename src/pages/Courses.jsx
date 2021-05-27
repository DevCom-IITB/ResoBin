import styled from 'styled-components'
import { CourseList, Filters, PageNo, Searchbar } from '@app/components/courses'

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
        <Searchbar />
        <CourseList />
        <PageNo />
      </MiddleContainer>
      <Filters />
    </Container>
  )
}

export default Courses
