import axios from 'axios'
import React, { useState, useEffect } from 'react'

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

  const [courseData, setCourseData] = useState({ count: 0, results: [] })
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
      // Normalize response shape (handle both AxiosResponse and plain data)
      const data = response && response.data ? response.data : response
      const count = (data && data.count) || 0
      const results = (data && data.results) || []
      setCourseData({ count, results })
    } catch (error) {
      if (axios.isCancel(error)) return
      toast({ status: 'error', content: error, key: 'course-list' })
    }

    setLoading(false)
  }

  useEffect(() => {
    const filter = getQueryString()
    const filterObj = typeof filter === 'string' || !filter ? {} : filter
    const rawQ = (filterObj.q || '').trim()
    let q
    let searchFields = 'code,title,description'
    if (/^[A-Za-z]{2,3} [0-9]+$/.test(rawQ)) {
      // Exact code with a space like "CS 101" -> normalize and search code only
      q = rawQ.replace(/\s+/g, '')
      searchFields = 'code'
    } else if (/^[A-Za-z]{1,4}[0-9]{0,3}$/i.test(rawQ)) {
      // Looks like a code prefix like C, CH, CH1, CH10, CS101 -> search in code only
      q = rawQ
      searchFields = 'code'
    } else {
      q = rawQ
    }
    const params = {
      search_fields: searchFields,
      q,
      ...filterKeys.reduce(
        (accumulator, value) => ({ ...accumulator, [value]: filterObj[value] }),
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
