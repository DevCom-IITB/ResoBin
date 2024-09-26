import { isEmpty, kebabCase } from 'lodash'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation, useParams } from 'react-router-dom'

import { CoursePageContainer } from 'components/CoursePage'
import { LoaderAnimation, PageContainer, toast } from 'components/shared'
import { API } from 'config/api'
import { coursePageUrl } from 'helpers'

const CoursePage = () => {
  const location = useLocation()
  const { code, titleSlug } = useParams()
  const [courseData, setCourseData] = useState({})
  const [cutoffs, setCutoffs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCourseData = async () => {
      try {
        setLoading(true)
        const response = await API.courses.read({ code })
        // console.log(response)
        const reponseCutoff = await API.courses.getCutoffs({ code })
        setCourseData(response)
        setCutoffs(reponseCutoff)
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
  if (titleSlug !== kebabCase(courseData.title)) {
    const pathname = coursePageUrl(courseData.code, courseData.title)
    return <Navigate to={{ ...location, pathname }} replace />
  }

  return (
    <PageContainer disable={['aside']}>
      <Helmet>
        <title>{`${courseData.code}: ${courseData.title} - ResoBin`}</title>
        <meta property="description" content={courseData.description} />
      </Helmet>

      <CoursePageContainer courseData={courseData} cutoffs={cutoffs} />
    </PageContainer>
  )
}

export default CoursePage
