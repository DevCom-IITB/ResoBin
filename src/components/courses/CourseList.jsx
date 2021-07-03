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

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.darksecondary};
`

const Results = styled.h4`
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-align: right;
  color: ${({ theme }) => theme.darksecondary};
  opacity: 80%;
`

const CourseList = ({ showFilters, onClick }) => {
  const courseCount = courseData.length

  return (
    <Container>
      <CourseSearch showFilters={showFilters} />
      <List>
        <Heading>
          <Title>Courses</Title>
          <Results>{courseCount} courses found</Results>
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
