import debounce from 'lodash.debounce'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { CourseList, CourseSearch } from 'components/courses'
import { FilterAside } from 'components/filter'
import { toastError } from 'components/toast'
import { useViewportContext } from 'context/ViewportContext'
import { searchAsync } from 'helpers'
import {
  selectCourseSearch,
  selectCourseList,
  setSearch,
} from 'store/courseSlice'
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
  const search = useSelector(selectCourseSearch)

  // ? filtered course data
  const [courseDataFiltered, setCourseDataFiltered] = useState(courseData)

  // ? search input state
  const dispatch = useDispatch()
  const handleChange = (event) => dispatch(setSearch(event.currentTarget.value))

  // ? loading status while searching
  const [loadingSearch, setLoadingSearch] = useState(false)

  useEffect(() => {
    setLoadingSearch(true)
    searchAsync({
      dataSrc: courseData,
      dataKeys: searchFields,
      keywords: search,
    })
      .then(setCourseDataFiltered)
      .then(() => setLoadingSearch(false))
      .catch((error) => {
        toastError(error.message)
      })
  }, [search, courseData])

  const loading = loadingSearch

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
