import styled from 'styled-components'
import { useLocalStorage } from 'hooks'
import { CourseList, CourseSearch, FiltersBody } from 'components/courses'
import { Divider } from 'components/shared'
import { Filter, X } from '@styled-icons/heroicons-outline'
import { HEX2RGBA } from 'helpers'

const Container = styled.div`
  display: flex;
  margin: 4rem 0 0 11.5rem;
`

const MiddleContainer = styled.div`
  margin-right: ${({ showFilters }) => (showFilters ? '19rem' : '5rem')};
  transition-duration: 200ms;

  /* height: calc(100% - 8.1rem); */
  /* overflow-y: scroll; */

  &::-webkit-scrollbar {
    width: 0.75rem;
    background-color: ${({ theme }) => theme.secondary};
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

const RightContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  position: fixed;
  top: 4rem;
  right: ${({ showFilters }) => (showFilters ? '0' : '-100%')};

  width: 19rem;
  height: 100%;
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
  height: 3rem;
  margin-bottom: 1rem;
  padding: 1.25rem 2rem 0;
`

const CourseBody = styled.div`
  padding: 0rem 2rem;
  /* background: grey; */
`

const Courses = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <MiddleContainer showFilters={showFilters}>
        <CourseSearch />
        <CourseBody>
          <CourseList />
        </CourseBody>
      </MiddleContainer>

      <IconContainer showFilters={showFilters} onClick={handleClick}>
        <Filter size="1.5rem" />
      </IconContainer>

      <RightContainer showFilters={showFilters}>
        <Header>
          <Title>Filter</Title>
          <X
            style={{
              cursor: 'pointer',
              width: '1.75rem',
            }}
            onClick={handleClick}
          />
        </Header>
        <Divider style={{ margin: '0rem 2rem', width: 'auto' }} />
        <FiltersBody />
      </RightContainer>
    </Container>
  )
}

export default Courses
