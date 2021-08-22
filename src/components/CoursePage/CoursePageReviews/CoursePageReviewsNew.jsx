import { SettingOutlined } from '@ant-design/icons'
import { Collapse, Select, Form, Button, Input } from 'antd'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components/macro'

const CoursePageReviewsContainer = () => {
  const [comment, setComment] = useState('')
  const handleChange = (e) => setComment(e.target.value)

  const handleSubmit = () => {
    // this.setState({
    //   submitting: true,
    // })
    // setTimeout(() => {
    //   this.setState({
    //     submitting: false,
    //     value: '',
    //     comments: [
    //       ...this.state.comments,
    //       {
    //         author: 'Han Solo',
    //         avatar:
    //           'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //         content: <p>{this.state.value}</p>,
    //         datetime: ,
    //       },
    //     ],
    //   })
    // }, 1000)
  }

  return (
    <AddReviewContainer>
      <span>Your review</span>
      <Form.Item>
        <Input.TextArea
          autoSize={{ minRows: 5, maxRows: 20 }}
          rows={4}
          onChange={handleChange}
          value={comment}
        />
      </Form.Item>

      <span>Preview</span>
      <PreviewContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {comment || '*Nothing to preview*'}
        </ReactMarkdown>
      </PreviewContainer>

      <Form.Item>
        <Button
          htmlType="submit"
          // loading={submitting}
          onClick={handleSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </AddReviewContainer>
  )
}

export default CoursePageReviewsContainer

const AddReviewContainer = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`

const StyledTextArea = styled(Input.TextArea)`
  .ant-input {
  }
`

const PreviewContainer = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  font-size: 0.75rem;
  background: ${({ theme }) => theme.darksecondary};
`
