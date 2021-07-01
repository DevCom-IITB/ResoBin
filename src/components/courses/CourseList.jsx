import { Fragment } from 'react'
import styled from 'styled-components'
import { Divider } from 'components/shared'
import { CourseItem, PageNo } from 'components/courses'
import { courseData } from 'data/courses'
import { scrollBar } from 'styles'

const Container = styled.div`
  display: relative;
  margin-right: ${({ showFilters }) => (showFilters ? '19rem' : '0')};
  padding-right: ${({ showFilters }) => (showFilters ? '0' : '4rem')};

  height: calc(100vh - 4rem);
  ${scrollBar}
`

const List = styled.div`
  background: ${({ theme }) => theme.darksecondary};
  margin: 5rem 2rem 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.4);
  padding-bottom: 1rem;
`

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 2.5rem 2.5rem 0.5rem;
`

const Title = styled.h4`
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const Results = styled.h4`
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 1.5px;
  text-align: right;
  color: ${({ theme }) => theme.textColor};
  opacity: 80%;
`

const CourseList = ({ showFilters }) => {
  const courseCount = courseData.length

  return (
    <Container showFilters={showFilters}>
      <List>
        <Heading>
          <Title>Courses</Title>
          <Results>{courseCount} courses found</Results>
        </Heading>

        {courseData.map((data, index) => (
          <Fragment key={index}>
            <Divider margin="0.75rem 0" />
            <CourseItem data={data} />
          </Fragment>
        ))}
      </List>
      <PageNo />
    </Container>
  )
}

export default CourseList
