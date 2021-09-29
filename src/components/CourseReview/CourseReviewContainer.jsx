import { UserAdd } from '@styled-icons/heroicons-outline'
import { Divider } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'
import { LoaderAnimation } from 'components/shared'
import { ButtonSwitch } from 'components/shared/Buttons/Button'
import { toastError } from 'components/toast'

import CourseReviewAdd from './CourseReviewAdd'
import CourseReviewItem from './CourseReviewItem'

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

// TODO: make write review button primary
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

  const [reviewStatus, setReviewStatus] = useState(false)

  const handleReviewRequest = () => setReviewStatus((v) => !v)

  return loading ? (
    <LoaderAnimation />
  ) : (
    <>
      <ReviewOptions>
        <ButtonSwitch
          type="primary"
          active={reviewStatus ? 1 : 0}
          onClick={handleReviewRequest}
        >
          {!reviewStatus ? (
            <>
              <UserAdd size="18" style={{ marginRight: '0.5rem' }} />
              Request
            </>
          ) : (
            <>Cancel request</>
          )}
        </ButtonSwitch>
      </ReviewOptions>

      <CourseReviewAdd visible course={courseCode} parent={null} />

      {reviewsData.map((review) => (
        <Fragment key={review.id}>
          <CourseReviewItem content={review} course={courseCode} depth={0} />
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
