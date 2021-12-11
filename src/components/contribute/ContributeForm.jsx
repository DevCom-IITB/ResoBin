import { Button, Input, Select } from 'antd'
import { kebabCase } from 'lodash'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { CloudUpload, Trash } from 'styled-icons/heroicons-outline'

import { ButtonSquare, Form } from 'components/shared'
import tags from 'data/tags.json'
import { selectCourseListMinified } from 'store/courseSlice'

const ContributeForm = ({ fileItem, handleUpload, handleDelete }) => {
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
      initialValues={{
        ...fileItem.details,
        // description: 'No description available.',
      }}
    >
      <Form.Item
        name="title"
        // label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        name="description"
        // label="Description"
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 10 }}
          placeholder="Description"
        />
      </Form.Item>

      <Form.Item
        name="course"
        // label="Course"
        rules={[{ required: true, message: 'Please input the course!' }]}
      >
        <Select showSearch placeholder="Course" options={courseOptions} />
      </Form.Item>

      <Form.Item
        name="tags"
        // label="Tags"
      >
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
          icon={<CloudUpload size="16" />}
          onClick={handleUpload}
          loading={fileItem.status === 'uploading'}
        >
          Upload
        </ButtonSquare>

        <Button
          type="primary"
          danger
          icon={<Trash size="16" />}
          onClick={handleDelete}
          loading={fileItem.status === 'uploading'}
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '0.5rem',
            gap: '0.5rem',
          }}
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
  align-items: center;
  gap: 1rem;
`
