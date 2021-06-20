import styled from 'styled-components'
import { useLocalStorage } from 'hooks'
import { CourseList, CourseSearch, Filters } from 'components/courses'
import { Filter } from '@styled-icons/heroicons-outline'
import { HEX2RGBA } from 'helpers'
import { useState } from 'react'
import { InputRounded } from 'components/shared'
import { Search } from '@styled-icons/heroicons-outline'

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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: ${({ showFilters }) => (showFilters ? '64.75rem' : '83.75rem')};
  position: fixed;

  padding: 0 ${({ showFilters }) => (showFilters ? '2rem' : '6rem')} 0 2rem;

  background: linear-gradient(
    0deg,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
    ${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
  );
  z-index: 7;
`

const IconContainer = styled.div`
  display: ${({ showFilters }) => (showFilters ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;

  position: fixed;
  /* top: 4.5rem; */
  right: 2rem;
  color: #807da0;
  background: white;
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`

const Courses = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((search) => event.target.value)

  return (
    <Container>
      <SearchContainer showFilters={showFilters}>
        <InputRounded
          name="courseSearch"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
          Icon={Search}
        />
        <IconContainer showFilters={showFilters} onClick={handleClick}>
          <Filter size="1.5rem" />
        </IconContainer>
      </SearchContainer>

      <MiddleContainer showFilters={showFilters}>
        <CourseList />
      </MiddleContainer>

      <Filters handleClick={handleClick} showFilters={showFilters} />
    </Container>
  )
}

export default Courses
