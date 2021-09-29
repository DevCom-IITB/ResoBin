import { ThumbUp as HeartOutlined } from '@styled-icons/heroicons-outline'
import { ThumbUp as HeartFilled } from '@styled-icons/heroicons-solid'
import { Button, Comment, Tooltip } from 'antd'
import { format, formatDistance } from 'date-fns'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import styled from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'
import StyledAvatar from 'components/shared/Avatar'

import CourseReviewAdd from './CourseReviewAdd'

const CourseReviewItem = ({ content, course, depth }) => {
  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(content.votesCount)
  const [showReply, setShowReply] = useState(false)

  const like = () => {
    setLikeCount(likeStatus ? likeCount - 1 : likeCount + 1)
    setLikeStatus((prev) => !prev)
  }
  const showReplyForm = () => setShowReply((prev) => !prev)

  const actions = [
    <ButtonIcon
      key="comment-like"
      shape="round"
      color="white"
      size="middle"
      icon={
        likeStatus ? <HeartFilled size="18" /> : <HeartOutlined size="18" />
      }
      onClick={like}
    >
      <LikeCount>{likeCount}</LikeCount>
    </ButtonIcon>,

    depth < 4 && (
      <Button key="comment-reply" type="link" onClick={showReplyForm}>
        Reply
      </Button>
    ),
  ]

  return (
    <StyledComment
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
      <CourseReviewAdd
        visible={showReply}
        course={course}
        parent={content.id}
      />

      {content?.children?.map((child) => (
        <CourseReviewItem
          key={child.id}
          content={child}
          course={course}
          depth={depth + 1}
        />
      ))}
    </StyledComment>
  )
}

export default CourseReviewItem

const StyledComment = styled(Comment)`
  .ant-comment-avatar {
    cursor: default;
  }

  .ant-comment-actions {
    display: flex;
    align-items: center;
    height: 1.75rem;
  }
`

const LikeCount = styled.span`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textColor};
`

const CommentHeader = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.header};

  &:hover {
    color: ${({ theme }) => theme.header};
  }
`

const CommentSubHeader = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColorInactive};
`

const CommentText = styled.div`
  width: 80%;
  font-weight: 400;
  color: ${({ theme }) => theme.header};
`
