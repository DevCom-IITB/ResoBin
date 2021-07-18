import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { CourseList, CourseSearch } from 'components/courses'
import { FilterAside } from 'components/filter'
import { useViewportContext } from 'context/ViewportContext'
import { breakpoints } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
`

const CourseBody = ({ showFilters: showFilter, onClick }) => {
  // responsive layout state
  const { width } = useViewportContext()

  // search input state
  // const [search, setSearch] = useState('')
  // const handleChange = (event) => setSearch((e) => e.target.value)

  const { list: courseData } = useSelector((state) => state.course)
  useEffect(() => {
    // search
  }, [courseData])

  return (
    <Container>
      <CourseSearch showFilter={width < breakpoints.lg && showFilter} />
      <FilterAside FilterDropdown showFilters={width >= breakpoints.lg} />

      <CourseList courses={courseData} />
    </Container>
  )
}

export default CourseBody
