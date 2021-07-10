import { CourseItem, CourseSearch, PageNo } from 'components/courses'
import { courseData } from 'data/courses'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

const List = styled.div`
  padding: 0.5rem 0 1rem;
  margin: 0 0.75rem;
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 0.75rem;
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

const CourseList = ({ showFilters, onClick }) => {
  const courseCount = courseData.length

  return (
    <Container>
      <CourseSearch showFilters={showFilters} handleClick={onClick} />
      <List>
        <Heading>
          <Title>Courses</Title>
          <Results>
            {courseCount}
            &nbsp;results found
          </Results>
        </Heading>

        {courseData.map((data) => (
          <CourseItem data={data} key={data.id} />
        ))}
      </List>
      <PageNo />
    </Container>
  )
}

export default CourseList
