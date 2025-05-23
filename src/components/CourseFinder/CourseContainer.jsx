import axios from 'axios'
import { useState, useEffect } from 'react'

import { Aside, toast } from 'components/shared'
import { API } from 'config/api'
import { useQueryString } from 'hooks'

import CourseList from './CourseList'
import CourseSearch from './CourseSearch'
import { ClearAll } from './Filter/CourseFinderFilterContainer'
import CourseFinderFilterForm, {
  filterKeys,
} from './Filter/CourseFinderFilterForm'

let ajaxRequest = null
const CourseFinderContainer = () => {
  const { getQueryString, deleteQueryString } = useQueryString()

  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(true)
  const [seed, setSeed] = useState(1)

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
    let q
    if (/^[A-Za-z]{2,3} [0-9]+$/.test(filter.q)) {
      q = filter.q.replace(' ', '')
    } else {
      q = filter.q
    }
    const params = {
      search_fields: 'code,title,description',
      q,
      ...filterKeys.reduce(
        (accumulator, value) => ({ ...accumulator, [value]: filter[value] }),
        {}
      ),
    }

    fetchCourses(params)
  }, [getQueryString])

  return (
    <>
      <CourseSearch loading={loading} setLoading={setLoading} />

      <CourseList
        title="Courses"
        count={courseData.count}
        courseList={courseData.results}
        loading={loading}
        setLoading={setLoading}
      />

      <Aside
        title="Filter"
        subtitle={
          <ClearAll
            onClick={() => {
              deleteQueryString(...filterKeys)
              setSeed(seed + 1)
            }}
          >
            Reset all
          </ClearAll>
        }
        loading={loading}
      >
        <CourseFinderFilterForm setLoading={setLoading} key={seed} />
      </Aside>
    </>
  )
}

export default CourseFinderContainer
