import styled from 'styled-components'

import { CourseItem } from 'components/courses'
import { PageHeading, PageTitle } from 'components/shared'
import { device } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
  @media ${device.min.lg} {
    padding-right: ${({ theme }) => theme.asideWidth};
    transition: padding-right 200ms ease-in;
  }
`

const Results = styled.span`
  opacity: 80%;
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.darksecondary};
`

const List = styled.ul`
  margin: 0 0.75rem;
`

const CourseList = ({ coursesData }) => {
  const courseCount = coursesData.length

  return (
    <Container>
      <PageHeading>
        <PageTitle>Courses</PageTitle>
        <Results>
          {courseCount}
          &nbsp;results found
        </Results>
      </PageHeading>

      <List>
        {coursesData.map((data) => (
          <CourseItem data={data} key={data.id} />
        ))}
      </List>
    </Container>
  )
}

export default CourseList
