import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import { API } from 'api'
import { CourseList, CourseSearch } from 'components/CourseFinder'
import { FilterAside, FilterFloatButton } from 'components/filter'
import { toastError } from 'components/toast'
import { useViewportContext } from 'context/ViewportContext'
import { useQueryString } from 'hooks'
import { breakpoints } from 'styles/responsive'

const CourseFinderContainer = () => {
  const { width } = useViewportContext()
  const { getQueryString } = useQueryString()

  const [showFilter, setShowFilter] = useState(false)
  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async (params) => {
    try {
      setLoading(true)
      const response = await API.courses.list({ params })
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
      department: filter.department,
      is_half_semester: filter.halfsem,
      credit_min: filter.credit_min,
      credit_max: filter.credit_max,
      semester: filter.semester,
    }

    fetchCourses(params)
  }, [getQueryString])
  console.log(courseData)

  return (
    <Container>
      <CourseSearch
        loading={loading}
        setLoading={setLoading}
        showFilter={width < breakpoints.lg && showFilter}
      />

      {/* For desktops */}
      <FilterAside />
      <FilterFloatButton
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />

      <CourseList
        title="Courses"
        count={courseData.count}
        courseList={courseData.results}
        loading={loading}
        setLoading={setLoading}
      />
    </Container>
  )
}

export default CourseFinderContainer

const Container = styled.div`
  width: 100%;
`
