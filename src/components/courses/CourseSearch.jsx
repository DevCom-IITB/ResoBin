import { Search } from '@styled-icons/heroicons-outline'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { FilterDropdown } from 'components/filter'
import { InputRounded } from 'components/shared'
import { HEX2RGBA } from 'helpers'
import { device } from 'styles/responsive'

const SearchContainer = styled.div`
  position: sticky;
  top: 3rem;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  padding: 0 0.75rem;
  background: linear-gradient(
    0deg,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
    ${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
  );

  @media ${device.min.lg} {
    margin-right: ${({ theme }) => theme.asideWidth};
    transition: margin-right 200ms ease-in;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: ${({ showFilters }) => (showFilters ? 'initial' : 'none')};
  background-color: rgba(0, 0, 0, 0.55);
`

const CourseSearch = ({ showFilters }) => {
  // search input state
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((e) => e.target.value)

  // const { list: courseData } = useSelector((state) => state.course)
  // useEffect(() => {
  //   // search
  // }, [courseData])

  useEffect(() => {
    console.log('search', search)
  }, [search])

  return (
    <SearchContainer>
      {showFilters ? (
        <>
          <FilterDropdown showFilters={showFilters} />
          <Overlay showFilters={showFilters} />
        </>
      ) : null}

      <InputRounded
        name="courseSearch"
        type="search"
        placeholder="Course code, name or description"
        value={search}
        onChange={handleChange}
        label="Search"
        Icon={Search}
      />
    </SearchContainer>
  )
}

export default CourseSearch
