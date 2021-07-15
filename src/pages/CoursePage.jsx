import { Filter, X } from '@styled-icons/heroicons-outline'
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

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.navbarHorizontalWidth};
  }
`

const IconContainer = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  color: white;
  background: ${({ theme }) => theme.logo};
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.6);
  cursor: pointer;
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
      <h1>
        {data.Code} - {data.Title}
      </h1>
      <h3>{data.Description}</h3>
    </Container>
  )
}

export default CoursePage
