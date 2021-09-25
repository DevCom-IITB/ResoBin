import { PencilAlt, UserAdd } from '@styled-icons/heroicons-outline'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'
import { ButtonSwitch } from 'components/shared/Buttons/Button'

import CourseReviewAdd from './CourseReviewAdd'
import CourseReviewItem from './CourseReviewItem'

const nestComments = (commentsList) => {
  const commentsMap = {}
  commentsList.forEach((comment) => {
    commentsMap[comment.id] = comment
  })

  commentsList.forEach((comment) => {
    if (comment.parentId !== null) {
      if (commentsMap[comment.parentId].replies === undefined)
        commentsMap[comment.parentId].replies = []
      commentsMap[comment.parentId].replies.push(comment)
    }
  })

  return commentsList.filter((comment) => comment.parentId === null)
}

// TODO: make write review button primary
const CourseReviewsContainer = () => {
  const [reviewsData, setReviewsData] = useState([])
  const { courseCode } = useParams()

  useEffect(() => {
    const fetchReviews = async () => {
      let response = await API.courses.listReviews({
        code: courseCode,
      })
      response = response.data.map(
        ({
          id,
          user_profile: author,
          body,
          votes_count: votes,
          timestamp,
          parent: parentId,
        }) => ({
          id,
          author,
          body,
          votes,
          timestamp,
          parentId,
        })
      )
      response = nestComments(response)
      setReviewsData(response)
    }

    fetchReviews()
  }, [courseCode])

  const [writeStatus, setWriteStatus] = useState(false)
  const toggleWrite = () => setWriteStatus((v) => !v)
  const [reviewStatus, setReviewStatus] = useState(false)

  const handleReviewRequest = () => setReviewStatus((v) => !v)

  return (
    <>
      <ReviewOptions>
        <ButtonSwitch
          type="primary"
          active={writeStatus ? 1 : 0}
          onClick={toggleWrite}
        >
          {!writeStatus ? (
            <>
              <PencilAlt size="18" style={{ marginRight: '0.5rem' }} />
              Write
            </>
          ) : (
            <>Cancel review</>
          )}
        </ButtonSwitch>

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

      <CourseReviewAdd
        visible={writeStatus}
        course={courseCode}
        parent={null}
      />

      {reviewsData.map((review) => (
        <CourseReviewItem key={review.id} depth={0} {...review} />
      ))}
    </>
  )
}

export default CourseReviewsContainer

const ReviewOptions = styled.div`
  display: flex;
  gap: 1rem;
`
