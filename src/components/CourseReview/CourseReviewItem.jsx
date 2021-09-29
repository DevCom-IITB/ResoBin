import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import { Avatar, Comment, Tooltip } from 'antd'
import { format, formatDistance } from 'date-fns'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import styled from 'styled-components/macro'

const CourseReviewItem = ({ content, depth }) => {
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
      key={content?.id}
      actions={actions}
      author={
        <a href="google">
          <CommentHeader>{content?.userProfile.name}</CommentHeader>
        </a>
      }
      avatar={
        <Avatar
          src={content?.userProfile.profilePicture}
          alt="Profile pictuure"
        />
      }
      content={
        <CommentText
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content?.body),
          }}
        />
      }
      datetime={
        <Tooltip title={format(new Date(content.timestamp), 'dd.MM.yyyy')}>
          <CommentHeader>
            {formatDistance(new Date(content.timestamp), new Date(), {
              addSuffix: true,
            })}
          </CommentHeader>
        </Tooltip>
      }
    >
      {content?.children?.map((child) => (
        <CourseReviewItem key={child.id} content={child} depth={depth + 1} />
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
