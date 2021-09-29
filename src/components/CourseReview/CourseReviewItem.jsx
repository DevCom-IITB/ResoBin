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
  const [showReply, setShowReply] = useState(false)

  const like = () => {
    setLikeStatus((prev) => !prev)
  }

  const actions = [
    <LikeContainer>
      <ButtonIcon
        onClick={like}
        icon={
          likeStatus ? <HeartFilled size="20" /> : <HeartOutlined size="20" />
        }
        color="white"
      />
      <span>{content.votesCount || 0}</span>
    </LikeContainer>,
  ]

  const openReply = () => setShowReply((prev) => !prev)

  if (depth < 2)
    actions.push(
      <Button type="link" onClick={openReply} key="comment-basic-reply-to">
        Reply to
      </Button>
    )

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
  }
`

const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColorInactive};
  gap: 0.25rem;
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
