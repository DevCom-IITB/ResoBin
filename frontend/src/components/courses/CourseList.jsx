import { Fragment } from 'react'
import styled from 'styled-components'
import { Divider } from 'components/shared'
import { CourseItem } from 'components/courses'
import courseData from './courseData.json'

const Container = styled.div`
  background: ${({ theme }) => theme.darksecondary};
  margin: 1rem 2rem 2rem;
  height: 1500px; /* Test height */
  border-radius: 8px;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.4);
`

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const Title = styled.h4`
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 1.5px;
  padding: 2.5rem 2.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
`

const Results = styled.h4`
  padding: 2.5rem 2.5rem 1rem;
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 1.5px;
  text-align: right;
  color: ${({ theme }) => theme.textColor};
  opacity: 80%;
`

const CourseList = () => {
  const courseCount = courseData.length

  return (
    <Container>
      <Heading>
        <Title>Courses</Title>
        <Results>{courseCount} courses found</Results>
      </Heading>
      <Divider margin="0 0 0.75rem 0" />

      {courseData.map((data, index) => (
        <Fragment key={index}>
          <CourseItem data={data} />
          <Divider margin="0.75rem 0" />
        </Fragment>
      ))}
    </Container>
  )
}

export default CourseList
