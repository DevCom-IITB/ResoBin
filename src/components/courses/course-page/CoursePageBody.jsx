import { Divider } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 1.5rem 1rem;
  margin: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};
`

const CodeText = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`

const CoursePageBody = ({ data }) => {
  return (
    <Container>
      <CodeText>{data.Code}</CodeText>
      <h1>{data.Title}</h1>
      <h3>{data.Department}</h3>
      <Divider style={{ backgroundColor: '#aaa5a5' }} />
      <h3>{data.Description}</h3>
    </Container>
  )
}

export default CoursePageBody

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
