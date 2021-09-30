import { ThumbUp as HeartOutlined } from '@styled-icons/heroicons-outline'
import { ThumbUp as HeartFilled } from '@styled-icons/heroicons-solid'
import { Button, Comment, Tooltip } from 'antd'
import { format, formatDistance } from 'date-fns'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'
import { UserAvatar } from 'components/shared/Avatar'
import { selectUserProfile } from 'store/userSlice'

import { Editor, ReviewEditor } from './Editor'

const CourseReviewItem = ({ content, course, depth }) => {
  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(content.votesCount)
  const [action, setAction] = useState(null)

  const profile = useSelector(selectUserProfile)
  const allowEdit = profile.id === content.userProfile.id

  const like = () => {
    setLikeCount(likeStatus ? likeCount - 1 : likeCount + 1)
    setLikeStatus((prev) => !prev)
  }

  const showReplyForm = () =>
    action === 'reply' ? setAction(null) : setAction('reply')
  const showEditForm = () =>
    allowEdit && (action === 'edit' ? setAction(null) : setAction('edit'))

  const handleReviewEdit = (value) => {
    console.log(value)
  }

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

    allowEdit && (
      <Button key="comment-edit" type="link" onClick={showEditForm}>
        Edit
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
        <UserAvatar
          size="2rem"
          src={content?.userProfile.profilePicture}
          alt="Profile picture"
        />
      }
      content={
        action === 'edit' ? (
          <Editor
            visible
            course={course}
            parent={content.id}
            // value={DOMPurify.sanitize(content?.body)}
            // onChange={handleReviewEdit}
          />
        ) : (
          <CommentText
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content?.body),
            }}
          />
        )
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
      <ReviewEditor
        visible={action === 'reply'}
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

// const ReviewEditor = styled(ReactQuill)`
//   margin-bottom: 1rem;
//   border: 1px solid #000000;
//   border-radius: 0.5rem;
//   color: #000000;
//   background-color: ${({ theme }) => theme.textColor};
//   box-shadow: 0 0 1rem 4px rgba(0, 0, 0, 0.2);

//   .ql-toolbar.ql-snow {
//     display: block;
//     border: none;
//     border-bottom: 1px solid #000000;
//     border-top-left-radius: 0.5rem;
//     border-top-right-radius: 0.5rem;
//     background: #eaecec;
//   }

//   .ql-container.ql-snow {
//     border: none;
//     border-top: 1px solid #000000;
//   }

//   .ql-editor {
//     overflow-y: scroll;
//     height: 5rem;
//     resize: vertical;
//   }
// `

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
