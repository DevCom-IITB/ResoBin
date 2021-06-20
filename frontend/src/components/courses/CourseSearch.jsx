import { useState } from 'react'
import styled from 'styled-components'
import { InputRounded } from 'components/shared'
import { HEX2RGBA } from 'helpers'
import { Search } from '@styled-icons/heroicons-outline'
import { Filter } from '@styled-icons/heroicons-outline'

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  padding: 0 ${({ showFilters }) => (showFilters ? 2 : 6)}rem 0 2rem;
  position: fixed;
  right: calc(0.75rem + ${({ showFilters }) => (showFilters ? 19 : 0)}rem);
  left: 11.5rem;
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
  right: 2rem;

  color: #807da0;
  background: white;
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`

const CourseSearch = ({ showFilters, onClick }) => {
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((search) => event.target.value)

  return (
    <SearchContainer showFilters={showFilters}>
      <InputRounded
        name="courseSearch"
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        Icon={Search}
      />
      <IconContainer showFilters={showFilters} onClick={onClick}>
        <Filter size="1.5rem" />
      </IconContainer>
    </SearchContainer>
  )
}

export default CourseSearch
