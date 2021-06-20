import { useState } from 'react'
import styled from 'styled-components'
import { CourseList, FiltersBody, PageNo } from 'components/courses'
import { Divider } from 'components/shared'
import { X } from '@styled-icons/heroicons-outline'
import CourseHeader from 'components/courses/CourseHeader'

const Container = styled.div`
  margin: 4rem 0 0 11.5rem;
`

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${({ showFilters }) => (showFilters ? '19rem' : '5rem')};
`

const RightContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  position: fixed;
  top: 4rem;
  width: 19rem;
  height: 100%;
  padding: 1.25rem 2rem;
  z-index: 7; /* To put searchbar at the bottom */
  box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
  right: ${({ showFilters }) => (showFilters ? '0' : '-100%')};
`

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1.5px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const XStyle = {
  cursor: 'pointer',
  width: '1.75rem',
}

const Courses = () => {
  const [showFilters, setShowFilters] = useState(true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <CourseHeader showFilters={showFilters} handleClick={handleClick} />
      <MiddleContainer showFilters={showFilters}>
        <CourseList />
        <PageNo />
      </MiddleContainer>

      <RightContainer showFilters={showFilters}>
        <Header>
          <Title>Filter</Title>
          <X style={XStyle} onClick={handleClick} />
        </Header>
        <Divider />
        <FiltersBody />
      </RightContainer>
    </Container>
  )
}

export default Courses
