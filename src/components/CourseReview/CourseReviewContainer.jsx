import { Divider } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'
import { CourseContentRequest } from 'components/CoursePage'
import { LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'

import CourseReviewItem from './CourseReviewItem'
import { ReviewEditor } from './Editor'
import reviewTemplate from './reviewTemplate'

const nestComments = (commentsList) => {
  const commentsMap = {}
  commentsList.forEach((comment) => {
    commentsMap[comment.id] = comment
  })

  commentsList.forEach((comment) => {
    if (comment.parent !== null) {
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
  const { courseCode } = useParams()

  const [reviewsData, setReviewsData] = useState([])
  const [APILoading, setAPILoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setAPILoading(true)
        let response = await API.courses.listReviews({ code: courseCode })
        response = nestComments(response)
        setReviewsData(response)
      } catch (error) {
        toastError(error)
      } finally {
        setAPILoading(false)
      }
    }

    fetchReviews()
  }, [courseCode])

  const handleUpdateContent = ({ id, payload }) => {
    if (id === null) {
      // ? create review
      setReviewsData((_reviewsData) => _reviewsData.concat([payload]))
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

  const createContent = async (review) => {
    try {
      const response = await API.reviews.create({
        payload: {
          course: courseCode,
          parent: null,
          body: review,
        },
      })

      handleUpdateContent({ id: null, payload: { ...response, children: [] } })
    } catch (error) {
      toastError(error)
    }
  }

  if (APILoading) return <LoaderAnimation />

  return (
    <>
      <Header>
        <h1 style={{ fontSize: '1.25rem' }}>Reviews</h1>

        <CourseContentRequest code={courseCode} type="reviews" />
      </Header>

      <ReviewEditor
        visible
        initialValue={reviewTemplate}
        onSubmit={createContent}
      />

      {reviewsData.map((review) => (
        <Fragment key={review.id}>
          <CourseReviewItem
            content={review}
            updateContent={handleUpdateContent}
            course={courseCode}
            depth={0}
          />
          <StyledDivider />
        </Fragment>
      ))}
    </>
  )
}

export default CourseReviewContainer

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`

const StyledDivider = styled(Divider)`
  margin: 1rem 0;
  background-color: rgba(255, 255, 255, 0.2);
`
