/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash/debounce'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseList, CourseSearch } from 'components/CourseFinder'
import { toastError } from 'components/toast'
import { searchAsync } from 'helpers'
import { selectAllFavourites } from 'store/userSlice'

const searchFields = ['Code', 'Title', 'Description']

const FavouritesContainer = () => {
  const location = useLocation()
  const history = useHistory()
  const queryString = new URLSearchParams(location.search)

  const [search, setSearch] = useState(queryString.get('q') || '')

  const setQueryString = (query) => {
    // No change
    if (query === (queryString.get('q') || '')) return

    // update query string or clear query string if query is empty
    if (query) queryString.set('q', query)
    else queryString.delete('q')

    // reset pagination
    queryString.delete('p')

    history.push({
      pathname: location.pathname,
      search: `?${queryString.toString()}`,
    })
  }

  const [, setCourseDataFiltered] = useState([])
  const favouriteCourses = useSelector(selectAllFavourites)

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
      dataSrc: favouriteCourses,
      dataKeys: searchFields,
      keywords: search,
    })
  }, [favouriteCourses, search, searchCoursesDebounced])

  return (
    <Container>
      <CourseSearch
        loading={loadingResults}
        value={search}
        onChange={handleChange}
        showFilter={false}
        filterState={null}
      />

      <CourseList
        title="Favourites"
        courseCodes={favouriteCourses}
        loading={loadingResults}
      />
    </Container>
  )
}

export default FavouritesContainer

const Container = styled.div`
  width: 100%;
`
