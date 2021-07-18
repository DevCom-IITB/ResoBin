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

const searchFields = ['Code', 'Title', 'Description']

const CourseBody = ({ showFilters: showFilter, onClick }) => {
  // responsive layout state
  const { width } = useViewportContext()
  // total course data
  const { list: courseData, loading: loadingAPI } = useSelector(
    (state) => state.course
  )

  // filtered course data
  const [courseDataFiltered, setCourseDataFiltered] = useState([])

  // search input state
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch(event.currentTarget.value)

  // loading status while searching
  const [loadingSearch, setLoadingSearch] = useState(false)

  useEffect(() => {
    // search through course data
    setLoadingSearch(true)

    async function filterMyData() {
      await setTimeout(() => {
        setCourseDataFiltered(
          courseData.filter((course) =>
            course.Title.toLowerCase().includes(search.toLowerCase())
          )
        )
        setLoadingSearch(false)
      }, 1000)
    }

    filterMyData()
  }, [search, courseData])

  const loading = loadingSearch || loadingAPI

  return (
    <Container>
      <CourseSearch
        loading={loading}
        value={search}
        onChange={handleChange}
        showFilter={width < breakpoints.lg && showFilter}
        filterState={null}
      />
      <FilterAside FilterDropdown showFilters={width >= breakpoints.lg} />

      <CourseList courses={courseDataFiltered} loading={loading} />
    </Container>
  )
}

export default CourseBody
