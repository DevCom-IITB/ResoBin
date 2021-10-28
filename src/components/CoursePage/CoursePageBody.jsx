import { Col, Divider, Row } from 'antd'
import styled from 'styled-components/macro'

import { device, fontSize } from 'styles/responsive'

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

      <Row>
        <Col>
          <SubHeaderText>Course Workload</SubHeaderText>
          <CenterText>
            Lectures : {courseData.workload.lecture} | Tutorial:{' '}
            {courseData.workload.tutorial} | Practical:{' '}
            {courseData.workload.practical} | Selfstudy:{' '}
            {courseData.workload.selfstudy}
          </CenterText>
        </Col>
      </Row>
    </Container>
  )
}

export default CoursePageBody

const Container = styled.div`
  padding: 1.5rem 1rem;
  margin: 0 0.75rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};

  @media ${device.max.md} {
    margin: 1rem 0.75rem;
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

const SubHeaderText = styled.div`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`

const CenterText = styled.h3`
  text-align: center;
`
