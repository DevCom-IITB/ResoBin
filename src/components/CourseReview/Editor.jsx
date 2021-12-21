import { DocumentText } from '@styled-icons/heroicons-outline'
import { Comment } from 'antd'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { ButtonSquare, toast, UserAvatar } from 'components/shared'
import { selectUserProfile } from 'store/userSlice'

import reviewTemplate from './reviewTemplate'

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

function loadTemplate() {
  const delta = this.quill.clipboard.convert(reviewTemplate)
  this.quill.setContents(delta, 'api')
}

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      loadTemplate,
    },
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const CustomToolbar = () => (
  <Toolbar id="toolbar" style={{ border: 'none' }}>
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option aria-label="button" value="1" />
      <option aria-label="button" value="2" />
      <option aria-label="button" selected />
    </select>

    <button type="button" aria-label="button" className="ql-bold" />

    <button type="button" aria-label="button" className="ql-italic" />

    <button type="button" className="ql-loadTemplate">
      <DocumentText size="24" />
    </button>
  </Toolbar>
)

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
      <div>
        <CustomToolbar />
        <StyledReactQuill
          placeholder="Write your review here..."
          onChange={handleChange}
          value={content}
          formats={formats}
          modules={modules}
        />

        <ButtonSquare
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={loading}
        >
          Post
        </ButtonSquare>
      </div>
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
  background: ${({ theme }) => theme.darksecondary};
  color: ${({ theme }) => theme.textColor};
  border-top: 1px solid ${({ theme }) => theme.dividerColor};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0 0 1rem 4px rgb(0 0 0 / 20%);
  margin-bottom: 1rem;

  .ql-container {
    border: none;
  }

  .ql-editor {
    &.ql-blank::before {
      color: ${({ theme }) => theme.textColorInactive};
    }
  }
`

const Toolbar = styled.div`
  background: ${({ theme }) => theme.darksecondary};
  color: ${({ theme }) => theme.textColor};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  .ql-stroke {
    fill: none;
    stroke: ${({ theme }) => theme.textColor};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  .ql-picker-label::before {
    color: ${({ theme }) => theme.textColor};
  }
`
