import styled from 'styled-components/macro'

import { Divider } from 'components/shared'
import { TimetableSelector } from 'components/Timetable'
import { device, fontSize } from 'styles/responsive'

import CourseWorkload from './CourseWorkload'

const CoursePageBody = ({ courseData }) => {
  return (
    <Container>
      <CourseInfo>
        <CourseCode>{courseData.code}</CourseCode>
        <CourseTitle>{courseData.title}</CourseTitle>
        <CourseDepartment>
          {courseData.department.name} | {courseData.credits} credits
        </CourseDepartment>
        <Divider margin="1rem 0" />
        <CourseDescription>
          {courseData.description || 'Not available'}
        </CourseDescription>
      </CourseInfo>

      <FlexGap>
        <CourseWorkload workload={courseData.workload} />

        <TimetableSelector semester={courseData.semester} />
      </FlexGap>
    </Container>
  )
}

export default CoursePageBody

const Container = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  @media ${device.max.md} {
    margin-top: 0.75rem;
  }
`

const CourseInfo = styled.div`
  /*  */
`

const CourseCode = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: ${fontSize.responsive.$4xl};
`

const CourseTitle = styled.h1`
  font-size: ${fontSize.responsive.$2xl};
`

const CourseDepartment = styled.h3`
  margin-top: 0.5rem;
  font-weight: 400;
  font-size: ${fontSize.responsive.sm};
`

const CourseDescription = styled.p`
  color: lightgray;
  font-weight: 300;
  font-size: ${fontSize.responsive.md};
  text-align: justify;
`

const FlexGap = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
`
