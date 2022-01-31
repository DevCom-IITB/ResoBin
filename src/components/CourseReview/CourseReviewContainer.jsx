import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseContentRequest } from 'components/CoursePage'
import { Divider, LoaderAnimation, toast } from 'components/shared'
import { API } from 'config/api'

import CourseReviewItem from './CourseReviewItem'
import { ReviewEditor } from './Editor'

const nestComments = (commentsList) => {
  const commentsMap = {}
  commentsList.forEach((comment) => {
    commentsMap[comment.id] = comment
  })

  commentsList.forEach((comment) => {
    if (comment.parent !== null && commentsMap[comment.parent]) {
      if (commentsMap[comment.parent].children === undefined)
        commentsMap[comment.parent].children = []
      commentsMap[comment.parent].children.push(comment)
    }
  })

  return commentsList.filter((comment) => comment.parent === null)
}

const recursiveApply = (array, callback) =>
  callback(array).map((item) =>
    item?.children?.length
      ? { ...item, children: recursiveApply(item.children, callback) }
      : item
  )

const CourseReviewContainer = () => {
  const { code } = useParams()

  const [reviewsData, setReviewsData] = useState([])
  const [APILoading, setAPILoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setAPILoading(true)
        let response = await API.courses.listReviews({ code })
        response = nestComments(response)
        setReviewsData(response)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setAPILoading(false)
      }
    }

    fetchReviews()
  }, [code])

  const handleUpdateContent = ({ id, payload }) => {
    if (id === null) {
      // ? create review
      setReviewsData([payload, ...reviewsData])
    } else if (payload === null) {
      // ? delete review / reply
      setReviewsData((_reviewsData) =>
        recursiveApply(_reviewsData, (array) =>
          array.filter((review) => id !== review.id)
        )
      )
    } else {
      // ? update review / reply
      setReviewsData((_reviewsData) =>
        recursiveApply(_reviewsData, (array) =>
          array.map((review) => (id !== review.id ? review : payload))
        )
      )
    }
  }

  const createContent = async ({ body }) => {
    try {
      const response = await API.reviews.create({
        payload: { course: code, parent: null, body },
      })

      handleUpdateContent({ id: null, payload: { ...response, children: [] } })
      toast({ status: 'success', content: 'Successfully posted review' })
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }

  if (APILoading) return <LoaderAnimation />

  return (
    <>
      <Header>
        <h1 style={{ fontSize: '1.25rem' }}>Reviews</h1>

        <CourseContentRequest code={code} type="reviews" />
      </Header>

      <ReviewEditor onSubmit={createContent} templateHandler />

      {reviewsData.map((review) => (
        <Fragment key={review.id}>
          <Divider margin="1rem 0" />

          <CourseReviewItem
            content={review}
            updateContent={handleUpdateContent}
            course={code}
            depth={0}
          />
        </Fragment>
      ))}
    </>
  )
}

export default CourseReviewContainer

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`
