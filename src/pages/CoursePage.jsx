import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Redirect, useLocation, useParams } from 'react-router-dom'

import { API } from 'api'
import {
  CoursePageContainer,
  CoursePageBreadcrumbs,
} from 'components/CoursePage'
import { LoaderAnimation, PageContainer } from 'components/shared'
import { toastError } from 'components/toast'
import { coursePageUrl } from 'helpers/format'

const CoursePage = ({ match }) => {
  const location = useLocation()
  const { courseCode } = useParams()
  const [courseData, setCourseData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCourseData = async () => {
      setLoading(true)
      try {
        const response = await API.courses.read({ code: courseCode })
        setCourseData(response)
      } catch (error) {
        toastError(error)
      } finally {
        setLoading(false)
      }
    }

    getCourseData()
  }, [courseCode])

  if (loading) return <LoaderAnimation />

  if (isEmpty(courseData)) return <Redirect to="/404" />

  const title = `${courseData.code}: ${courseData.title}`

  // ? redirect to canonical URL (eg: /courses/CL152/introduction-to-chemical-engineering)
  const canonicalUrl = coursePageUrl(courseData.code, courseData.title)
  if (match.url !== canonicalUrl)
    return <Redirect to={{ ...location, pathname: canonicalUrl }} />

  return (
    <PageContainer>
      <Helmet>
        <title>{`${title} - ResoBin`}</title>
        <meta property="description" content={courseData.description} />
      </Helmet>

      <CoursePageBreadcrumbs courseTitle={title} />

      <CoursePageContainer courseData={courseData} />
    </PageContainer>
  )
}

export default CoursePage
