import { Divider } from 'antd'
import styled from 'styled-components/macro'

import { device, fontSize } from 'styles/responsive'

import CourseWorkload from './CourseWorkload'

const CoursePageBody = ({ courseData }) => {
  return (
    <Container id="details">
      <CourseCode>{courseData.code}</CourseCode>
      <CourseTitle>{courseData.title}</CourseTitle>
      <CourseDepartment>
        {courseData.department.name} | {courseData.credits} credits
      </CourseDepartment>
      <Divider
        style={{ backgroundColor: '#ffffff', margin: '1rem 0', opacity: 0.3 }}
      />
      <CourseDescription>
        {courseData.description || 'Not available'}
      </CourseDescription>

      <CourseWorkload workload={courseData.workload} />
    </Container>
  )
}

export default CoursePageBody

const Container = styled.div`
  padding: 1.5rem 1rem;
  margin-bottom: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};

  @media ${device.max.md} {
    margin-top: 0.75rem;
  }
`

const CourseCode = styled.h1`
  font-size: ${fontSize.responsive.$4xl};
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`

const CourseTitle = styled.h1`
  font-size: ${fontSize.responsive.$2xl};
`

const CourseDepartment = styled.h3`
  margin-top: 0.5rem;
  font-size: ${fontSize.responsive.sm};
  font-weight: 400;
`

const CourseDescription = styled.p`
  font-size: ${fontSize.responsive.md};
  font-weight: 300;
  text-align: justify;
  color: lightgray;
`
