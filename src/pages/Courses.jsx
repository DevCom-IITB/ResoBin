import { Filter, X } from '@styled-icons/heroicons-outline'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

import { CourseBody } from 'components/courses'
import { useViewportContext } from 'context/ViewportContext'
import { breakpoints, device } from 'styles/responsive'

const Container = styled.div`
  display: flex;

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
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

const Courses = () => {
  // Show or hide dropdown filters state
  const [showFilters, setShowFilters] = useState(false)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  // Responsiveness for filter icon (media query alternative)
  const { width } = useViewportContext()
  const [Icon, setIcon] = useState(Filter)
  useEffect(() => {
    if (width > breakpoints.lg) {
      setShowFilters(false)
      setIcon(null)
    } else setIcon(showFilters ? X : Filter)
  }, [showFilters, width])

  return (
    <Container>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>
      {Icon && (
        <IconContainer onClick={handleClick}>
          <Icon size="1.5rem" />
        </IconContainer>
      )}

      <CourseBody showFilters={showFilters} onClick={handleClick} />
    </Container>
  )
}

export default Courses
