import { UserAdd } from '@styled-icons/heroicons-outline'
import { Divider } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'
import { LoaderAnimation } from 'components/shared'
import { ButtonSwitch } from 'components/shared/Buttons/Button'
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

const CourseReviewsContainer = () => {
  const [reviewsData, setReviewsData] = useState([])
  const { courseCode } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      try {
        let response = await API.courses.listReviews({
          code: courseCode,
        })
        response = nestComments(response)
        setReviewsData(response)
      } catch (error) {
        toastError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [courseCode])

  const [reviewRequestStatus, setReviewRequestStatus] = useState(false)

  const handleReviewRequest = () => setReviewRequestStatus((prev) => !prev)

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
      console.log(error)
      toastError(error)
    }
  }

  return loading ? (
    <LoaderAnimation />
  ) : (
    <>
      <ReviewOptions>
        <ButtonSwitch
          type="primary"
          active={reviewRequestStatus ? 1 : 0}
          onClick={handleReviewRequest}
        >
          {!reviewRequestStatus ? (
            <>
              <UserAdd size="18" style={{ marginRight: '0.5rem' }} />
              Request
            </>
          ) : (
            <>Cancel request</>
          )}
        </ButtonSwitch>
      </ReviewOptions>

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

export default CourseReviewsContainer

const ReviewOptions = styled.div`
  display: flex;
  gap: 1rem;
`

const StyledDivider = styled(Divider)`
  margin: 1rem 0;
  background-color: rgba(255, 255, 255, 0.2);
`
