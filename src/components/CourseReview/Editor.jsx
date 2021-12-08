import { Button, Comment } from 'antd'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { toast, UserAvatar } from 'components/shared'
import { selectUserProfile } from 'store/userSlice'

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
]

// const modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// }

export const Editor = ({ visible, onSubmit, initialValue = '' }) => {
  const [content, setContent] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  const handleChange = (value) => setContent(value)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit(content)
      setContent(initialValue)
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    visible && (
      <>
        <StyledReactQuill
          placeholder="Write something"
          value={content}
          onChange={handleChange}
          formats={formats}
        />

        <StyledButton
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}
          type="primary"
        >
          Submit
        </StyledButton>
      </>
    )
  )
}

export const ReviewEditor = ({ visible, initialValue, onSubmit }) => {
  const profile = useSelector(selectUserProfile)

  return (
    visible && (
      <Comment
        avatar={
          <UserAvatar
            size="2rem"
            src={profile.profilePicture}
            alt="Profile picture"
          />
        }
        content={
          <Editor visible onSubmit={onSubmit} initialValue={initialValue} />
        }
      />
    )
  )
}

export default Editor

const StyledReactQuill = styled(ReactQuill)`
  color: #000000;
  background-color: ${({ theme }) => theme.textColor};
  border: 1px solid #000000;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 4px rgb(0 0 0 / 20%);

  .ql-toolbar.ql-snow {
    display: block;
    background: #eaecec;
    border: none;
    border-bottom: 1px solid #000000;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .ql-container.ql-snow {
    border: none;
    border-top: 1px solid #000000;
  }

  .ql-editor {
    overflow-y: scroll;
    resize: vertical;
  }
`

const StyledButton = styled(Button)`
  margin-top: 1rem;
  border-radius: 0.5rem;
`
