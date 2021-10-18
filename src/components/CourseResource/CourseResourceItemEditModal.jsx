import { Form, Input, Modal, Select } from 'antd'
import { useSelector } from 'react-redux'

import { toastError } from 'components/toast'
import { selectCourseListMinified, selectResourceTags } from 'store/courseSlice'

const CourseResourceItemEditModal = ({
  visible,
  onEdit,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onEdit(values)
    } catch (error) {
      toastError('Check your inputs')
    }
  }

  const tagOptions = useSelector(selectResourceTags)?.map(({ tag }) => ({
    label: tag,
    value: tag,
  }))

  const courseOptions = useSelector(selectCourseListMinified)?.map(
    ({ code, title }) => ({
      label: `${code}: ${title}`,
      value: code,
    })
  )

  return (
    <Modal
      visible={visible}
      title="Edit your upload"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="editResource"
        initialValues={initialValues}
        onFinish={onEdit}
      >
        <Form.Item
          name="course"
          label="Course"
          rules={[
            {
              required: true,
              message: 'Course is necessary',
            },
          ]}
        >
          <Select showSearch placeholder="Course" options={courseOptions} />
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Title is necessary',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            placeholder="Add tags"
            showArrow
            tokenSeparators={[',']}
            options={tagOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CourseResourceItemEditModal
