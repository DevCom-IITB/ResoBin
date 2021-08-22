import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons'
import { PencilAlt, UserAdd } from '@styled-icons/heroicons-outline'
import { Avatar, Button, Comment, Tooltip } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import styled from 'styled-components/macro'

import reviewsData from './__mock__/reviewsData'
import CoursePageReviewsNew from './CoursePageReviewsNew'

const CommentHeader = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.header};
`

const CommentText = styled.p`
  width: 80%;
  font-weight: 400;
  color: ${({ theme }) => theme.header};
`

const CoursePageReviewsContainer = () => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <button type="button" onClick={like}>
        {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
        <span className="comment-action">{likes}</span>
      </button>
    </Tooltip>,

    <Tooltip key="comment-basic-dislike" title="Dislike">
      <button type="button" onClick={dislike}>
        {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
        <span className="comment-action">{dislikes}</span>
      </button>
    </Tooltip>,

    <span key="comment-basic-reply-to">Reply to</span>,
  ]

  const [write, setWrite] = useState(false)
  const toggleWrite = () => setWrite(!write)

  const handleReviewRequest = (e) => {
    console.log(e)
  }

  return (
    <>
      <ReviewOptions>
        <Button type="primary" onClick={toggleWrite}>
          <PencilAlt size="22" style={{ marginRight: '0.5rem' }} />
          Write
        </Button>

        <Button type="button" onClick={handleReviewRequest}>
          <UserAdd size="22" style={{ marginRight: '0.5rem' }} />
          Request
        </Button>
      </ReviewOptions>

      {write && <CoursePageReviewsNew />}

      {reviewsData.map(({ author, avatar, content }) => (
        <Comment
          actions={actions}
          author={
            <a href="google">
              <CommentHeader>{author}</CommentHeader>
            </a>
          }
          avatar={<Avatar src={avatar.src} alt={avatar.alt} />}
          content={<CommentText>{content}</CommentText>}
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <CommentHeader>{moment().fromNow()}</CommentHeader>
            </Tooltip>
          }
        >
          <Comment
            actions={actions}
            author={<a href="google">{author}</a>}
            avatar={<Avatar src={avatar.src} alt={avatar.alt} />}
            content={<p>{content}</p>}
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          />
        </Comment>
      ))}
    </>
  )
}

export default CoursePageReviewsContainer

const ReviewOptions = styled.div`
  display: flex;
  gap: 1rem;
`
