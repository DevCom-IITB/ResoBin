import { Form, Button, Input } from 'antd'
import { useState } from 'react'

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
    <>
      <Form.Item>
        <Input.TextArea rows={4} onChange={handleChange} value={comment} />
      </Form.Item>

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
    </>
  )
}

export default CoursePageReviewsContainer
