import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import { API } from 'api'
import { CourseList, CourseSearch } from 'components/CourseFinder'
import { Aside } from 'components/shared'
import { toastError } from 'components/toast'
import { useQueryString } from 'hooks'

const FavouritesContainer = () => {
  const { getQueryString } = useQueryString()

  const [loading, setLoading] = useState(true)
  const [courseData, setCourseData] = useState([])

  const fetchCourses = async (params) => {
    try {
      setLoading(true)
      const response = await API.profile.favorites({ params })
      setCourseData(response)
    } catch (error) {
      toastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filter = getQueryString()
    const params = {
      q: filter.q,
      search_fields: 'code,title,description',
      page: filter.p,
    }

    fetchCourses(params)
  }, [getQueryString])

  return (
    <>
      <CourseSearch
        loading={loading}
        setLoading={setLoading}
        showFilter={false}
      />

      <CourseList
        title="Favourites"
        count={courseData.count}
        courseList={courseData.results}
        loading={loading}
        setLoading={setLoading}
      />

      <Aside title="My friends" />
    </>
  )
}

export default FavouritesContainer
