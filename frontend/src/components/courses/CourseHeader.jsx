import { useState } from 'react'
import styled from 'styled-components'
import { InputRounded } from 'components/shared'
import { HEX2RGBA } from 'helpers'
import { Filter, Search } from '@styled-icons/heroicons-outline'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 100%;
  position: sticky;
  top: 4rem;
  padding: 0 ${({ showFilters }) => (showFilters ? '21rem' : '2rem')} 0 2rem;
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
  justify-content: center;
  align-items: center;
  margin-left: 2rem;

  width: 3rem;
  height: 3rem;

  color: #807da0;
  background: white;
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;

  cursor: pointer;
  z-index: 10;
`

const CourseHeader = ({ showFilters, handleClick }) => {
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

      <IconContainer showFilters={showFilters} onClick={handleClick}>
        <Filter size="1.5rem" />
      </IconContainer>
    </Container>
  )
}

export default CourseHeader
