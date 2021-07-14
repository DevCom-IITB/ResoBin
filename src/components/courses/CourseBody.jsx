import { Search } from '@styled-icons/heroicons-outline'
import { useState } from 'react'
import styled from 'styled-components'

import { CourseList } from 'components/courses'
import { FilterDropdown, FilterAside } from 'components/filter'
import { InputRounded } from 'components/shared'
import { useViewportContext } from 'context/ViewportContext'
import { courseData } from 'data/courses'
import { HEX2RGBA } from 'helpers'
import { breakpoints, device } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
`

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
    margin-right: ${({ theme }) => theme.filterAsideWidth};
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

const CourseBody = ({ showFilters, onClick }) => {
  // responsive layout state
  const { width } = useViewportContext()
  const breakpoint = breakpoints.lg

  // search input state
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((e) => e.target.value)

  return (
    <Container>
      <SearchContainer>
        {
          // if viewport width is not adequate, use dropdown filter else use aside filter
          width < breakpoint ? (
            <>
              <FilterDropdown showFilters={showFilters} onClick={onClick} />
              <Overlay showFilters={showFilters} />
            </>
          ) : null
        }

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

      <FilterAside FilterDropdown showFilters={width >= breakpoint} />

      <CourseList coursesData={courseData} />
    </Container>
  )
}

export default CourseBody
