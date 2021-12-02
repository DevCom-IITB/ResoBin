import axios from 'axios'
import { useState, useEffect } from 'react'

import { API } from 'api'
import { CourseList, CourseSearch } from 'components/CourseFinder'
import { FilterAside, FilterFloatButton } from 'components/filter'
import { toast } from 'components/shared'
import { useQueryString, useResponsive } from 'hooks'

let ajaxRequest = null
const CourseFinderContainer = () => {
  const { isDesktop } = useResponsive()
  const { getQueryString } = useQueryString()

  const [showFilter, setShowFilter] = useState(false)
  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async (params) => {
    setLoading(true)

    try {
      if (ajaxRequest) ajaxRequest.cancel()
      ajaxRequest = axios.CancelToken.source()

      const response = await API.courses.list({
        params,
        cancelToken: ajaxRequest.token,
      })
      setCourseData(response)
    } catch (error) {
      if (axios.isCancel(error)) return
      toast({ status: 'error', content: error })
    }

    setLoading(false)
  }

  useEffect(() => {
    const filter = getQueryString()
    const params = {
      q: filter.q,
      search_fields: 'code,title,description',
      page: filter.p,
      department: filter.department,
      is_half_semester: filter.halfsem,
      is_running: filter.running,
      credits_min: filter.credits_min,
      credits_max: filter.credits_max,
      semester: filter.semester,
      tags: filter.tags,
    }

    fetchCourses(params)
  }, [getQueryString])

  return (
    <>
      <CourseSearch
        loading={loading}
        setLoading={setLoading}
        showFilter={!isDesktop && showFilter}
      />

      {/* For desktops */}
      <FilterAside setLoading={setLoading} />
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
    </>
  )
}

export default CourseFinderContainer
