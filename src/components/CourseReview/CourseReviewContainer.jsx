import { UserGroup } from '@styled-icons/heroicons-outline'
import { Divider } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'
import { ButtonSwitch, LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
import { selectUserProfile } from 'store/userSlice'

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
  const profile = useSelector(selectUserProfile)
  const { courseCode } = useParams()

  const [reviewsData, setReviewsData] = useState([])
  const [APILoading, setAPILoading] = useState(true)
  const [requestReview, setRequestReview] = useState({
    status: profile.reviewsRequested?.includes(courseCode) ?? false,
    loading: false,
  })

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

  const handleReviewRequest = async () => {
    try {
      setRequestReview((value) => ({ ...value, loading: true }))

      if (requestReview.status) {
        await API.reviews.request.remove({ code: courseCode })
      } else {
        await API.reviews.request.add({ code: courseCode })
      }

      setRequestReview((value) => ({ ...value, status: !value.status }))
    } catch (error) {
      toastError(error)
    } finally {
      setRequestReview((value) => ({ ...value, loading: false }))
    }
  }

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

  return APILoading ? (
    <LoaderAnimation />
  ) : (
    <>
      <Header>
        <h1 style={{ fontSize: '1.25rem' }}>Reviews</h1>

        <ButtonSwitch
          type="primary"
          $active={requestReview.status}
          onClick={handleReviewRequest}
          icon={<UserGroup size="18" style={{ marginRight: '0.25rem' }} />}
          loading={requestReview.loading}
        >
          {!requestReview.status ? <>Request</> : <>Revoke</>}
        </ButtonSwitch>
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
