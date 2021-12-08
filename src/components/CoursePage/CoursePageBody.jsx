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
  margin-bottom: 0.75rem;
  padding: 1.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  @media ${device.max.md} {
    margin-top: 0.75rem;
  }
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
