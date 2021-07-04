import { Search } from '@styled-icons/heroicons-outline'
import { InputRounded } from 'components/shared'
import { HEX2RGBA } from 'helpers'
import { useState } from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 3rem;

  height: 3rem;
  padding: 0 0.75rem;
  background: linear-gradient(
    0deg,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
    ${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
  );
  z-index: 8;
`

const CourseSearch = () => {
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((search) => event.target.value)
  const onSearch = () => {
    console.log(search)
  }

  return (
    <SearchContainer>
      <InputRounded
        name="courseSearch"
        type="search"
        placeholder="Course code, name or description"
        value={search}
        onChange={handleChange}
        label={'Search'}
        Icon={Search}
      />
    </SearchContainer>
  )
}

export default CourseSearch
