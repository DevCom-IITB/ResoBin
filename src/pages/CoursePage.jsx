import { Filter, X } from '@styled-icons/heroicons-outline'
import { Divider, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { CourseBody } from 'components/courses'
import { LoaderAnimation } from 'components/shared'
import { useViewportContext } from 'context/ViewportContext'
import { breakpoints, device } from 'styles/responsive'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.header};
  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
  @media ${device.min.lg} {
    padding-right: ${({ theme }) => theme.asideWidthRight};
    transition: padding-right 200ms ease-in;
  }
`

const LeftContainer = styled.div`
  width: 80%;
  height: 100%;
  padding: 30px;
  margin: 10px;
  border-radius: 25px;
  background: ${({ theme }) => theme.darksecondary};
`

const RightContainer = styled.div`
  padding: 20px;
`

const VertSpace = styled.div`
  height: 20px;
`

const CodeText = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`

const SubHeaderText = styled.div`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.logo};
`

const CenterText = styled.h3`
  text-align: center;
`

const CoursePage = ({ match }) => {
  const { id } = useParams()
  const { list: courseData } = useSelector((state) => state.course)
  const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g')
  const splittedArray = id.match(regex)
  const code = `${splittedArray[0]} ${splittedArray[1]}`
  const data = courseData.filter((course) => course.Code === code)[0]

  return (
    <Container>
      <LeftContainer>
        <CodeText>{data.Code}</CodeText>
        <h1>{data.Title}</h1>
        <h3>{data.Department}</h3>
        <Divider style={{ backgroundColor: '#aaa5a5' }} />
        <h3>{data.Description}</h3>
        <VertSpace />
        <Row>
          <Col span={8}>
            <SubHeaderText>Course Structure</SubHeaderText>
            <CenterText>
              Lectures : {data.Structure.Lecture} | Tutorial:{' '}
              {data.Structure.Tutorial} | Practical: {data.Structure.Practical}
            </CenterText>
          </Col>
          <Col span={8}>
            <SubHeaderText>Prerequisites</SubHeaderText>
            <CenterText>{data.Prerequisite}</CenterText>
          </Col>
          <Col span={8}>
            <SubHeaderText>Credits</SubHeaderText>
            <CenterText>{data.TotalCredits}</CenterText>
          </Col>
        </Row>
        <VertSpace />
        <SubHeaderText>Course Reviews</SubHeaderText>
      </LeftContainer>
      <RightContainer />
    </Container>
  )
}

export default CoursePage

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
