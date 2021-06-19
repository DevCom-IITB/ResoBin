import styled from 'styled-components'
import { HEX2RGBA } from 'helpers'
import { InputRounded } from 'components/shared'
import { Search } from '@styled-icons/heroicons-outline'
import { useState } from 'react'

const Container = styled.div`
  background: linear-gradient(
    0deg,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
    ${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  position: sticky;
  top: 4rem;
  padding: 0 2rem;
  z-index: 7;
`

const CourseSearchbar = () => {
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((search) => event.target.value)

  return (
    <Container>
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

export default CourseSearchbar
