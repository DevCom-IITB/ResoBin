import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Divider, LoaderAnimation, toast } from 'components/shared'
import { API } from 'config/api'

import DepartmentReviewItem from './DepartmentReviewItem'



const DepartmentReviewContainer = () => {
  const { departmentSlug,id } = useParams()

  const [reviewsData, setReviewsData] = useState([])
  const [APILoading, setAPILoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setAPILoading(true)
        const response = await API.programReviews.read({id})
        setReviewsData(response)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setAPILoading(false)
      }
    }

    fetchReviews()
  }, [departmentSlug,id])



  if (APILoading) return <LoaderAnimation />

  return (
    <>
      <Header>
        <h1 style={{ fontSize: '1.25rem' }}>Department Reviews</h1>
      </Header>

      {reviewsData.map((review) => (
        <Fragment key={review.id}>
          <Divider margin="1rem 0" />

          <DepartmentReviewItem
            content={review}
            depth={0}
          />
        </Fragment>
      ))}
    </>
  )
}

export default DepartmentReviewContainer

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`
