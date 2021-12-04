import { isEmpty, kebabCase } from 'lodash'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation, useParams, useNavigate } from 'react-router-dom'

import {
  CoursePageContainer,
  CoursePageBreadcrumbs,
} from 'components/CoursePage'
import { LoaderAnimation, PageContainer, toast } from 'components/shared'
import { API } from 'config/api'
import { coursePageUrl } from 'helpers/format'

const CoursePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { code, titleSlug } = useParams()
  const [courseData, setCourseData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCourseData = async () => {
      setLoading(true)
      try {
        const response = await API.courses.read({ code })
        setCourseData(response)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    getCourseData()
  }, [code])

  if (loading) return <LoaderAnimation />
  if (isEmpty(courseData)) return <Navigate to="/404" replace />

  // ? redirect to canonical URL (eg: /courses/CL152/introduction-to-chemical-engineering)
  const pathname = coursePageUrl(courseData.code, courseData.title)
  const title = `${courseData.code}: ${courseData.title}`

  if (titleSlug !== kebabCase(courseData.title))
    navigate({ ...location, pathname }, { replace: true })

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
