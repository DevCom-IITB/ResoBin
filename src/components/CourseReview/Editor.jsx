import { useState } from 'react'
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import {
  ButtonSquare,
  Comment,
  Form,
  toast,
  UserAvatar,
} from 'components/shared'
import { selectUserProfile } from 'store/userSlice'

import reviewTemplate from './reviewTemplate'

const formats = [
  'header',
  'code',
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

const CustomToolbar = ({ templateHandler }) => (
  <Toolbar id="toolbar" style={{ border: 'none' }}>
    <select
      className="ql-header"
      defaultValue="3"
      onChange={(e) => e.persist()}
    >
      <option aria-label="button" value="1" />
      <option aria-label="button" value="2" />
      <option aria-label="button" value="3" />
    </select>

    <button type="button" aria-label="button" className="ql-bold" />

    <button type="button" aria-label="button" className="ql-italic" />

    {templateHandler && (
      <button type="button" className="ql-loadTemplate">
        Load template
      </button>
    )}
  </Toolbar>
)

export const QuillEditor = ({
  value,
  onChange,
  placeholder,
  templateHandler,
  validate,
}) => {
  const handleChange = async (content, delta, source, editor) => {
    validate(editor.getText().length)
    onChange(content)
  }

  return (
    <>
      <CustomToolbar templateHandler={templateHandler} />
      <StyledReactQuill
        formats={formats}
        modules={modules}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </>
  )
}

export const Editor = ({
  onSubmit,
  initialValue = '',
  submitText = 'Post',
  templateHandler,
}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      const errors = form.getFieldError('body')
      if (errors.length) throw new Error(errors[0])

      await onSubmit(values)
      form.resetFields()
      form.setFields([{ name: 'body', errors: [] }])
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  const validate = (length) => {
    if (length <= 10) {
      form.setFields([
        {
          name: 'body',
          errors: ['Review must be atleast 10 characters long.'],
        },
      ])
    } else if (length > 3000) {
      form.setFields([
        {
          name: 'body',
          errors: ['Review must be atmost 3000 characters long.'],
        },
      ])
    } else {
      form.setFields([{ name: 'body', errors: [] }])
    }
  }
  // git imp "Add "
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      initialValues={{ body: initialValue }}
    >
      <Form.Item name="body">
        <QuillEditor
          templateHandler={templateHandler}
          placeholder="Write your review here..."
          validate={validate}
        />
      </Form.Item>

      <Form.Item>
        <ButtonSquare type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </ButtonSquare>
      </Form.Item>
    </Form>
  )
}

export const ReviewEditor = ({ ...editorProps }) => {
  const profile = useSelector(selectUserProfile)

  return (
    <Comment
      avatar={
        <UserAvatar
          size="2rem"
          src={profile.profilePicture}
          alt="Profile picture"
        />
      }
      content={<Editor {...editorProps} />}
    />
  )
}

export default Editor

const StyledReactQuill = styled(ReactQuill)`
  background: ${({ theme }) => theme.darksecondary};
  color: ${({ theme }) => theme.textColor};
  border-top: 1px solid ${({ theme }) => theme.dividerColor};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 1rem 4px rgb(0 0 0 / 20%);
  margin-bottom: 0.75rem;

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
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};

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

  button,
  select {
    background: none;
  }

  button.ql-loadTemplate {
    color: ${({ theme }) => theme.textColor};
    width: fit-content;
  }
`
