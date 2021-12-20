import { DocumentText } from "@styled-icons/heroicons-outline"
import { Button, Comment } from 'antd'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { toast, UserAvatar } from 'components/shared'
import { selectUserProfile } from 'store/userSlice'

import reviewTemplate from './reviewTemplate'

function loadTemplate() {
  const delta = this.quill.clipboard.convert(reviewTemplate)
  this.quill.setContents(delta, 'api')
}

const CustomTemplateLoad = () => {
  return (
    <DocumentText size="24"/>
  )
}

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

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      loadTemplate,
    }
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={e => e.persist()}>
      <option aria-label="button" value="1" />
      <option aria-label="button" value="2" />
      <option aria-label="button" selected />
    </select>
    <button type="button" aria-label="button" className="ql-bold" />
    <button type="button" aria-label="button" className="ql-italic" />
    <button type="button" className="ql-loadTemplate">
      <CustomTemplateLoad />
    </button>
  </div>
);

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
        <CustomToolbar/>
        <StyledReactQuill
          placeholder="Write your review here..."
          onChange={handleChange}
          formats={formats}
          modules={modules}
        />

        <StyledButton
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}
          type="primary"
        >
          Post
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
  background: white;
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