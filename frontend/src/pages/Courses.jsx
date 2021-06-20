import styled from 'styled-components'
import { useLocalStorage } from 'hooks'
import { CourseList, CourseSearch, Filters } from 'components/courses'
import { HEX2RGBA } from 'helpers'

const Container = styled.div`
  display: flex;
  margin: 0rem 0 0 11.5rem;
`

const MiddleContainer = styled.div`
  display: relative;
  margin-right: ${({ showFilters }) => (showFilters ? '19rem' : '0')};
  padding-right: ${({ showFilters }) => (showFilters ? '0' : '4rem')};

  height: calc(100vh - 4rem);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => HEX2RGBA(theme.textColor, 10)};
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.textColorInactive};
    border-radius: 2rem;
  }
`

const Courses = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <CourseSearch showFilters={showFilters} onClick={handleClick} />

      <MiddleContainer showFilters={showFilters}>
        <CourseList />
      </MiddleContainer>

      <Filters showFilters={showFilters} onClick={handleClick} />
    </Container>
  )
}

export default Courses
