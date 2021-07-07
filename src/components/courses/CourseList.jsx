import { CourseItem, CourseSearch, PageNo } from 'components/courses'
import { courseData } from 'data/courses'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

const List = styled.div`
  margin: 0 0.75rem;
  padding-bottom: 1rem;
`

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0rem 0.75rem;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.darksecondary};
  margin: 0;
`

const Results = styled.h1`
  font-weight: bold;
  font-size: 1rem;
  text-align: right;
  color: ${({ theme }) => theme.darksecondary};
  opacity: 80%;
  margin: 0;
`

const CourseList = ({ showFilters, onClick }) => {
  const courseCount = courseData.length

  return (
    <Container>
      <CourseSearch showFilters={showFilters} handleClick={onClick} />
      <List>
        <Heading>
          <Title>Courses</Title>
          <Results>{courseCount} results found</Results>
        </Heading>

        {courseData.map((data, index) => (
          <CourseItem data={data} key={index} />
        ))}
      </List>
      <PageNo />
    </Container>
  )
}

export default CourseList
