import { Button, Input, Select } from 'antd'
import { kebabCase } from 'lodash'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { ButtonSquare, Form } from 'components/shared'
import tags from 'data/tags.json'
import { useQueryString } from 'hooks'
import { selectCourseListMinified } from 'store/courseSlice'

const ContributeForm = ({ fileItem, handleUpload, handleDelete }) => {
  const { getQueryString } = useQueryString()
  const course = getQueryString('course')

  const tagOptions = tags.resourceTags.map((tag) => ({
    label: tag,
    value: kebabCase(tag),
  }))

  const courseListMinified = useSelector(selectCourseListMinified)
  const courseOptions = courseListMinified.map(({ code, title }) => ({
    label: `${code}: ${title}`,
    value: code,
  }))

  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      name="contribute"
      onFinish={handleUpload}
      layout="vertical"
      initialValues={{ ...fileItem.details, course }}
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: 'Title is required.' },
          { min: 5, message: 'Title must be atleast 5 characters.' },
          { max: 100, message: 'Title must be atmost 100 characters.' },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item name="author" rules={[{ required: false }]}>
        <Input placeholder="Author" />
      </Form.Item>

      <Form.Item name="description">
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 10 }}
          placeholder="Description"
          rules={[
            { max: 500, message: 'Title must be atmost 500 characters.' },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="course"
        rules={[{ required: true, message: 'Course is required.' }]}
      >
        <Select showSearch placeholder="Course" options={courseOptions} />
      </Form.Item>

      <Form.Item name="tags">
        <Select
          mode="tags"
          placeholder="Add tags"
          showArrow
          tokenSeparators={[',']}
          options={tagOptions}
        />
      </Form.Item>

      <ButtonContainer>
        <ButtonSquare
          type="primary"
          htmlType="submit"
          loading={fileItem.status === 'uploading'}
        >
          Submit
        </ButtonSquare>

        <Button
          type="primary"
          danger
          onClick={handleDelete}
          hidden={fileItem.status === 'uploading'}
          style={{ borderRadius: '0.5rem' }}
        >
          Delete
        </Button>
      </ButtonContainer>
    </Form>
  )
}

export default ContributeForm

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`
