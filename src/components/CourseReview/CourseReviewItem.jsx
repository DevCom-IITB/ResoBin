import { ThumbUp as HeartOutlined } from '@styled-icons/heroicons-outline'
import { ThumbUp as HeartFilled } from '@styled-icons/heroicons-solid'
import { Button, Comment, Tooltip } from 'antd'
import { format, formatDistance } from 'date-fns'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API } from 'api'
import { ButtonIcon } from 'components/shared'
import { UserAvatar } from 'components/shared/Avatar'
import { selectUserProfile } from 'store/userSlice'

import { Editor, ReviewEditor } from './Editor'

const CourseReviewItem = ({ content, updateContent, depth }) => {
  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(content.votesCount)
  const [action, setAction] = useState(null)

  const profile = useSelector(selectUserProfile)
  const isOwner = profile.id === content.userProfile.id

  const like = () => {
    setLikeCount(likeStatus ? likeCount - 1 : likeCount + 1)
    setLikeStatus((prev) => !prev)
  }

  const showReplyForm = () =>
    action === 'reply' ? setAction(null) : setAction('reply')
  const showEditForm = () =>
    isOwner && (action === 'edit' ? setAction(null) : setAction('edit'))

  const handleUpdate = async (body) => {
    try {
      const payload = { ...content, body }
      await API.reviews.update({ id: content.id, payload })

      updateContent({ id: content.id, payload })
      setAction(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      await API.reviews.delete({ id: content.id })
      updateContent({ id: content.id, payload: null })
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateChild = async (reply) => {
    try {
      const response = await API.reviews.create({
        payload: {
          course: content.course,
          parent: content.id,
          body: reply,
          status: false,
        },
      })
      const payload = { ...content, children: [...content.children, response] }

      updateContent({ id: content.id, payload })
      setAction(null)
    } catch (error) {
      console.log(error)
    }
  }

  const actions = [
    <ButtonIcon
      key="content-like"
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
      <Button key="content-reply" type="link" onClick={showReplyForm}>
        Reply
      </Button>
    ),

    isOwner && (
      <Button key="content-edit" type="link" onClick={showEditForm}>
        Edit
      </Button>
    ),

    isOwner && (
      <Button key="content-delete" type="link" onClick={handleDelete}>
        Delete
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
            initialValue={DOMPurify.sanitize(content?.body)}
            onSubmit={handleUpdate}
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
      <ReviewEditor visible={action === 'reply'} onSubmit={handleCreateChild} />

      {content?.children?.map((child) => (
        <CourseReviewItem key={child.id} content={child} depth={depth + 1} />
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
