import { CourseItem, PageNo } from 'components/courses'
import styled from 'styled-components'
import { device } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
  @media ${device.min.lg} {
    padding-right: ${({ theme }) => theme.filterAsideWidth};
  }
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

const List = styled.ul`
  margin: 0 0.75rem;
`

const CourseList = ({ coursesData }) => {
  const courseCount = coursesData.length

  return (
    <Container>
      <Heading>
        <Title>Courses</Title>
        <Results>
          {courseCount}
          &nbsp;results found
        </Results>
      </Heading>

      <List>
        {coursesData.map((data) => (
          <CourseItem data={data} key={data.id} />
        ))}
      </List>

      <PageNo />
    </Container>
  )
}

export default CourseList
