import { useState } from 'react'
import styled from 'styled-components'
import { InputRounded } from 'components/shared'
import { HEX2RGBA } from 'helpers'
import { Search } from '@styled-icons/heroicons-outline'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 100%;
  position: sticky;

  padding: 0 ${({ showFilters }) => (showFilters ? '21rem' : '2rem')} 0 2rem;
  background: linear-gradient(
    0deg,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
    ${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
  );
  z-index: 7;
`

const CourseSearch = ({ showFilters, handleClick }) => {
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((search) => event.target.value)

  return (
    <Container showFilters={showFilters}>
      <InputRounded
        name="courseSearch"
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        Icon={Search}
      />
    </Container>
  )
}

export default CourseSearch
