import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useParams } from 'react-router-dom'

import { DepartmentPageContainer } from 'components/HonorDepartments'
import { LoaderAnimation, PageContainer, toast } from 'components/shared'
import { API } from 'config/api'

const HonorsDepartmentPage = () => {

  const { departmentSlug , id} = useParams()
  const [deptReviews, setDeptReviews] = useState({})
  const [dept,setDept] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getHonorsDepartmentReviews = async () => {
      try {
        setLoading(true)
        const response = await API.programReviews.read({id})
        setDeptReviews(response)
        const honorsDepartments = await API.honors.list()
        console.log(honorsDepartments)
        setDept(honorsDepartments.filter((element) => element.id === id)[0])
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    getHonorsDepartmentReviews()
  }, [departmentSlug,id])

  if (loading) return <LoaderAnimation />
  if (isEmpty(deptReviews)) return <Navigate to="/404" replace />


  return (
    <PageContainer>
      <Helmet>
        <title>{`Honors: ${departmentSlug} - ResoBin`}</title>
        <meta property="description" content={deptReviews.body} />
      </Helmet>

      <DepartmentPageContainer departmentData={dept} departmentReviews={deptReviews}/>
    </PageContainer>
  )
}

export default HonorsDepartmentPage
