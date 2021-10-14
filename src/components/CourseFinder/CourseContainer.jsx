import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API } from 'api'
import { CourseList, CourseSearch } from 'components/CourseFinder'
import { FilterAside, FilterFloatButton } from 'components/filter'
import { toastError } from 'components/toast'
import { useViewportContext } from 'context/ViewportContext'
import { breakpoints } from 'styles/responsive'

const CourseFinderContainer = () => {
  const location = useLocation()
  const { width } = useViewportContext()

  const [showFilter, setShowFilter] = useState(false)
  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async (_filter) => {
    try {
      setLoading(true)
      const response = await API.courses.list({
        params: {
          search_fields: 'code,title,description',
          ..._filter,
        },
      })

      setCourseData(response)
    } catch (error) {
      toastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const qs = new URLSearchParams(location.search)
    const filter = Object.fromEntries(qs)

    fetchCourses(filter)
  }, [location.search])

  return (
    <Container>
      <CourseSearch
        loading={loading}
        setLoading={setLoading}
        showFilter={width < breakpoints.lg && showFilter}
      />

      <FilterAside showFilter={width >= breakpoints.lg} />
      <FilterFloatButton
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />

      <CourseList
        title="Courses"
        count={courseData.count}
        courseList={courseData.results}
        loading={loading}
      />
    </Container>
  )
}

export default CourseFinderContainer

const Container = styled.div`
  width: 100%;
`

/*
"count": 1,
"next": "http://localhost:8000/api/courses?cred=&dept=&fields=code%2Ctitle%2Cdescription%2Cdepartment%2Ccredit%2Cworkload&lvl=&page=2&q=hell&search_fields=code%2Ctitle%2Cdescription&sem=",
"previous": null,
"results": [
  {
    "code": "AE663",
    "title": "Software Development Techniques for Engineering and Scientists",
    "department": {
      "name": "Aerospace Engineering",
      "slug": "aerospace-engineering"
    },
    "description": "Using Unix command line tools to carry out common (mostly text processing) tasks. Automating typical tasks using basic shell-scripting. The effective use of version control for collaborating on code and documents. The use of LaTeX and other markup languages to generate professional documents. Use the Python programming language to carry out typical engineering/numerical computations such as those that involve (basic) manipulation of large arrays in an efficient manner. Generate 2D and simple 3D plots. Understand the impact of coding style and readability on quality. Debugging programs using a standardized approach, Understand the importance of tests and the philosophy of Test Driven Development. Write unit tests and improve the quality of code.",
    "credit": 6,
    "workload": {
      "lecture": 2,
      "tutorial": 0,
      "practical": 1,
      "selfstudy": 0
    }
  }
]
*/
