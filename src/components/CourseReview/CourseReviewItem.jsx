import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import { Button, Comment, Tooltip } from 'antd'
import { format, formatDistance } from 'date-fns'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import styled from 'styled-components/macro'

import StyledAvatar from 'components/shared/Avatar'

import CourseReviewAdd from './CourseReviewAdd'

const CourseReviewItem = ({ content, course, depth }) => {
  const [action, setAction] = useState(null)
  const [likes, setLikes] = useState(0)
  const [likeStatus, setLikeStatus] = useState(false)

  const like = () => {
    setLikes(1)
    setAction('liked')
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <button type="button" onClick={like}>
        {likeStatus ? <LikeFilled /> : <LikeOutlined />}
        <span className="comment-action">{likes}</span>
      </button>
    </Tooltip>,
  ]

  const openReply = () => {
    // setAction('replied')
    console.log('Reply clicked')
  }

  if (depth < 2)
    actions.push(
      <Button type="link" onClick={openReply} key="comment-basic-reply-to">
        Reply to
      </Button>
    )

  return (
    <Comment
      key={content?.id}
      actions={actions}
      author={
        <a href={`/profile/${content?.userProfile?.ldapId}`}>
          <CommentHeader>{content?.userProfile?.name}</CommentHeader>
        </a>
      }
      avatar={
        <StyledAvatar
          size="2rem"
          src={content?.userProfile.profilePicture}
          alt="Profile picture"
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
          <CommentSubHeader>
            {formatDistance(new Date(content.timestamp), new Date(), {
              addSuffix: true,
            })}
          </CommentSubHeader>
        </Tooltip>
      }
    >
      <CourseReviewAdd visible course={course} parent={null} />

      {content?.children?.map((child) => (
        <CourseReviewItem
          key={child.id}
          content={child}
          course={course}
          depth={depth + 1}
        />
      ))}
    </Comment>
  )
}

export default CourseReviewItem

const CommentHeader = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.header};

  &:hover {
    color: ${({ theme }) => theme.header};
  }
`

const CommentSubHeader = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColorInactive};
`

const CommentText = styled.div`
  width: 80%;
  font-weight: 400;
  color: ${({ theme }) => theme.header};
`
