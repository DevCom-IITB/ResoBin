import debounce from 'lodash/debounce'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { CourseList, CourseSearch } from 'components/courses'
import { FilterAside } from 'components/filter'
import { toastError } from 'components/toast'
import { useViewportContext } from 'context/ViewportContext'
import { searchAsync } from 'helpers'
import { selectCourseList, selectCourseAPILoading } from 'store/courseSlice'
import { breakpoints } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
`

const searchFields = ['Code', 'Title', 'Description']

const CourseBody = ({ showFilters: showFilter, onClick }) => {
  // ? responsive layout state
  const { width } = useViewportContext()

  // ? total course data
  const courseData = useSelector(selectCourseList)
  const loadingAPI = useSelector(selectCourseAPILoading)

  // ? filtered course data
  const [search, setSearch] = useState('')
  const [courseDataFiltered, setCourseDataFiltered] = useState([])

  // ? search input state
  const handleChange = (event) => setSearch(event.currentTarget.value)

  // ? loading status while searching
  const [loadingSearchResults, setLoadingSearchResults] = useState(true)

  // ? searching courses asynchronously
  const searchCourses = (searchParams) => {
    searchAsync(searchParams)
      .then(setCourseDataFiltered)
      .then(() => setLoadingSearchResults(false))
      .catch((error) => {
        toastError(error.message)
        setLoadingSearchResults(false)
      })
  }

  // ? debounce search input change to provide smoother search experience
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchCoursesDebounced = useCallback(debounce(searchCourses, 400), [])

  useEffect(() => {
    setLoadingSearchResults(true)
    searchCoursesDebounced({
      dataSrc: courseData,
      dataKeys: searchFields,
      keywords: search,
    })
  }, [courseData, search, searchCoursesDebounced])

  return (
    <Container>
      <CourseSearch
        loading={loadingSearchResults}
        value={search}
        onChange={handleChange}
        showFilter={width < breakpoints.lg && showFilter}
        filterState={null}
      />
      <FilterAside FilterDropdown showFilters={width >= breakpoints.lg} />

      <CourseList
        courses={courseDataFiltered}
        loading={loadingAPI || loadingSearchResults}
      />
    </Container>
  )
}

export default CourseBody
