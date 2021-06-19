import { useState } from 'react'
import styled from 'styled-components'
import {
  CourseList,
  FiltersBody,
  PageNo,
  CourseSearchbar,
} from 'components/courses'
import { Divider } from 'components/shared'
import { Filter, X } from '@styled-icons/heroicons-outline'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0 0 11.5rem;
`

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${({ showFilters }) => (showFilters ? '19rem' : '0rem')};
  /* transition: 300ms ease-in; */
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
  /* right: 0; */
  /* transition: 300ms ease-in; */
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

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 4.6rem;
  right: 2rem;

  width: 3rem;
  height: 3rem;
  color: #807da0;
  background: white;
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  right: ${({ showFilters }) => (showFilters ? '-100%' : '2rem')};
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
      <MiddleContainer showFilters={showFilters}>
        <CourseSearchbar />
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

      <IconContainer>
        <Filter showFilters={showFilters} size="1.5rem" onClick={handleClick} />
      </IconContainer>
    </Container>
  )
}

export default Courses
