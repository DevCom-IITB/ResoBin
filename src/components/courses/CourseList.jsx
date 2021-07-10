import { CourseItem, CourseSearch, PageNo } from 'components/courses'
import { courseData } from 'data/courses'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

const Heading = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0.5rem 1.5rem;
`

const Title = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.darksecondary};
`

const Results = styled.span`
  opacity: 80%;
  margin: 0;
  font-weight: bold;
  font-size: 1rem;
  text-align: right;
  color: ${({ theme }) => theme.darksecondary};
`

const CourseList = styled.ul`
  margin: 0 0.75rem;
`

const CourseBody = ({ showFilters, onClick }) => {
  const courseCount = courseData.length

  return (
    <Container>
      <CourseSearch showFilters={showFilters} handleClick={onClick} />
      <Heading>
        <Title>Courses</Title>
        <Results>
          {courseCount}
          &nbsp;results found
        </Results>
      </Heading>

      <CourseList>
        {courseData.map((data) => (
          <CourseItem data={data} key={data.id} />
        ))}
      </CourseList>
      <PageNo />
    </Container>
  )
}

export default CourseBody
