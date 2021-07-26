/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash/debounce'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseList, CourseSearch } from 'components/courses/course-finder'
import { FilterAside, FilterFloatButton } from 'components/filter'
import { toastError } from 'components/toast'
import { useViewportContext } from 'context/ViewportContext'
import { searchAsync } from 'helpers'
import { selectCourseList } from 'store/courseSlice'
import { breakpoints } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
`

const searchFields = ['Code', 'Title', 'Description']

const CourseBody = () => {
  // ? responsive layout state
  const { width } = useViewportContext()

  // ? show or hide dropdown filters state
  const [showFilter, setShowFilter] = useState(false)

  // ? total cached course data
  const courseData = useSelector(selectCourseList)

  // ? filtered course data
  const [search, setSearch] = useState('')

  const location = useLocation()
  const history = useHistory()
  const queryString = new URLSearchParams(location.search)
  const setQueryString = (query) => {
    // No change
    if (query === (queryString.get('q') || '')) return

    // update query string or clear query string if query is empty
    if (query) queryString.set('q', query)
    else queryString.delete('q')

    history.push({
      pathname: location.pathname,
      search: `?${queryString.toString()}`,
    })
  }

  const [courseDataFiltered, setCourseDataFiltered] = useState([])

  // ? search input state
  const handleChange = (event) => setSearch(event.currentTarget.value)

  // ? loading status while searching
  const [loadingResults, setLoadingSearchResults] = useState(true)

  // ? searching courses asynchronously
  const searchCourses = (searchParams) => {
    searchAsync(searchParams)
      .then(setCourseDataFiltered)
      .then(() => setQueryString(searchParams.keywords))
      .then(() => setLoadingSearchResults(false))
      .catch((error) => {
        toastError(error.message)
        setLoadingSearchResults(false)
      })
  }

  // ? debounce search input change to provide smoother search experience
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
        loading={loadingResults}
        value={search}
        onChange={handleChange}
        showFilter={width < breakpoints.lg && showFilter}
        filterState={null}
      />

      <FilterAside showFilter={width >= breakpoints.lg} />
      <FilterFloatButton
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />

      <CourseList courses={courseDataFiltered} loading={loadingResults} />
    </Container>
  )
}

export default CourseBody
