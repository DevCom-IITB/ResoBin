import { Col, Divider, Row } from 'antd'
import styled from 'styled-components/macro'

import { device, fontSize } from 'styles/responsive'

const CoursePageBody = ({ courseData }) => {
  return (
    <Container>
      <CourseCode>{courseData.Code}</CourseCode>
      <CourseTitle>{courseData.Title}</CourseTitle>
      <CourseDepartment>
        {courseData.Department} | {courseData.TotalCredits} credits
      </CourseDepartment>

      <Divider
        style={{ backgroundColor: '#ffffff', margin: '1rem 0', opacity: 0.3 }}
      />
      <CourseDescription>
        {courseData.Description || 'Not available'}
      </CourseDescription>

      <Row>
        <Col span={8}>
          <SubHeaderText>Course Structure</SubHeaderText>
          <CenterText>
            Lectures : {courseData.Structure.Lecture} | Tutorial:{' '}
            {courseData.Structure.Tutorial} | Practical:{' '}
            {courseData.Structure.Practical}
          </CenterText>
        </Col>
        <Col span={8}>
          <SubHeaderText>Prerequisites</SubHeaderText>
          <CenterText>{courseData.Prerequisite}</CenterText>
        </Col>
        <Col span={8}>
          <SubHeaderText>Credits</SubHeaderText>
          <CenterText>{courseData.TotalCredits}</CenterText>
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
  background: ${({ theme }) => theme.darksecondary};

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

// Sample data

// Code: "AE 152"
// Department: "Aerospace Engineering"
// Description: "Nomenclature of aircraft components. Standard atmosphere. Basic Aerodynamics : Streamlines, steady fluid motion, incompressible flow, Bernoulli\"s equation,Mach number, Pressure and airspeed measurement, Boundary Layer,Reynolds number, Laminar and Turbulent flow. Airfoils and wings: pressure coefficient and lift calculation, Critical Mach number, Wave drag, Finite wings, Induced drag, Swept wings. Aircraft performance: steady level flight, Altitude effects, Absolute ceiling, steady climbing flight, Energy methods, Range and Endurance, Sustained level turn, pull-up, V-n diagram, Take off and landing. Reentry vehicles: Ballistic and Glide Reentry, Blunt body concept."
// LastUpdate: "01-12-2015"
// Prerequisite: "Nil"
// Structure: {Type: "T", Lecture: "2", Tutorial: "0", Practical: "1", Selfstudy: "0", …}
// TextReference: "Ojha S.K., Flight Performance of Aircraft, AIAA Series, 1995.Anderson, J.D., Introduction to Flight, McGraw Hill, 1989. Hale, J.F., Introduction to Aircraft Performance, Selection and Design, John Wiley, 1984."
// Title: "Introduction to Aerospace Engg."
// TotalCredits: "6"
// id: 1002
