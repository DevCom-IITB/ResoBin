import styled from 'styled-components'
import { useLocalStorage } from 'hooks'
import {
  CourseList,
  CourseSearch,
  FiltersBody,
  PageNo,
} from 'components/courses'
import { Divider } from 'components/shared'
import { Filter, X } from '@styled-icons/heroicons-outline'

const Container = styled.div`
  display: flex;
  margin: 4rem 0 0 11.5rem;
`

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${({ showFilters }) => (showFilters ? '19rem' : '5rem')};
  transition-duration: 200ms;
`

const RightContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  position: fixed;
  top: 4rem;
  right: ${({ showFilters }) => (showFilters ? '0' : '-100%')};

  width: 19rem;
  height: 100%;
  padding: 1.25rem 2rem;
  z-index: 7; /* To put searchbar at the bottom */
  box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
  transition-duration: 150ms;
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
  display: ${({ showFilters }) => (showFilters ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  margin-left: 2rem;

  position: fixed;
  top: 4.5rem;
  right: 2rem;

  width: 3rem;
  height: 3rem;

  color: #807da0;
  background: white;
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;

  cursor: pointer;
  z-index: 10;
`

const XStyle = {
  cursor: 'pointer',
  width: '1.75rem',
}

const Courses = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <MiddleContainer showFilters={showFilters}>
        <CourseSearch />
        <CourseList />
        <PageNo />
      </MiddleContainer>

      <IconContainer showFilters={showFilters} onClick={handleClick}>
        <Filter size="1.5rem" />
      </IconContainer>

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
