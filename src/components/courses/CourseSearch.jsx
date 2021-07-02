import { useState } from 'react'
import styled from 'styled-components'
import { InputRounded } from 'components/shared'
import { HEX2RGBA } from 'helpers'
import { Search } from '@styled-icons/heroicons-outline'

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;

  height: 4rem;
  padding: 0 2rem;
  background: linear-gradient(
    0deg,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
    ${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
  );
  z-index: 100;
`

const CourseSearch = () => {
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((search) => event.target.value)

  return (
    <SearchContainer>
      <InputRounded
        name="courseSearch"
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        Icon={Search}
      />
    </SearchContainer>
  )
}

export default CourseSearch
