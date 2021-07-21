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
  const [courseDataFiltered, setCourseDataFiltered] = useState(courseData)

  // search input state
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch(event.currentTarget.value)

  // loading status while searching
  const [loadingSearch, setLoadingSearch] = useState(false)

  useEffect(() => {
    const searchCourses = async (keyword) => {
      setLoadingSearch(true)
      await setTimeout(() => {
        setCourseDataFiltered(
          courseData.filter((course) => {
            // Empty search allow all
            if (!keyword) return true

            // by default not accepted. Accept only if keyword found
            let flg = false

            // check if keyword exists in any of the selected keys
            searchFields.forEach((field) => {
              if (course[field]) {
                flg =
                  flg ||
                  course[field].toLowerCase().includes(keyword.toLowerCase())
              }
            })

            return flg
          })
        )

        setLoadingSearch(false)
      }, 400)
    }

    if (search) searchCourses(search)
    else setCourseDataFiltered(courseData)
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
