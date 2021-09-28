import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import { Avatar, Comment, Tooltip } from 'antd'
import DOMPurify from 'dompurify'
import moment from 'moment'
import { useState } from 'react'
import styled from 'styled-components/macro'

const CourseReviewItem = ({
  id,
  userProfile,
  body,
  votesCount,
  timestamp,
  replies,
  depth,
}) => {
  const [action, setAction] = useState(null)
  const [likes, setLikes] = useState(0)

  const like = () => {
    setLikes(1)
    setAction('liked')
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <button type="button" onClick={like}>
        {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
        <span className="comment-action">{likes}</span>
      </button>
    </Tooltip>,
  ]

  if (depth < 2)
    actions.push(<span key="comment-basic-reply-to">Reply to</span>)

  return (
    <Comment
      key={id}
      actions={actions}
      author={
        <a href="google">
          <CommentHeader>{userProfile.name}</CommentHeader>
        </a>
      }
      avatar={
        <Avatar src={userProfile.profile_picture} alt="Profile pictuure" />
      }
      content={
        <CommentText
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
        />
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <CommentHeader>{moment().fromNow()}</CommentHeader>
        </Tooltip>
      }
    >
      {replies?.map((reply) => (
        <CourseReviewItem key={reply.id} depth={depth + 1} {...reply} />
      ))}
    </Comment>
  )
}

export default CourseReviewItem

const CommentHeader = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.header};
`

const CommentText = styled.div`
  width: 80%;
  font-weight: 400;
  color: ${({ theme }) => theme.header};
`
