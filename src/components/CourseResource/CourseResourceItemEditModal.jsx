import { Modal, Form, Input } from 'antd'

import { toastError } from 'components/toast'

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
      form.resetFields()
      onEdit(values)
    } catch (error) {
      console.log(error)
      toastError('Check your inputs')
    }
  }

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
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CourseResourceItemEditModal

// const CollectionsPage = () => {
//   const [visible, setVisible] = useState(false)

//   const onCreate = (values) => {
//     console.log('Received values of form: ', values)
//     setVisible(false)
//   }

//   return (
//     <div>
//       <Button
//         type="primary"
//         onClick={() => {
//           setVisible(true)
//         }}
//       >
//         New Collection
//       </Button>
//       <CollectionCreateForm
//         visible={visible}
//         onCreate={onCreate}
//         onCancel={() => {
//           setVisible(false)
//         }}
//       />
//     </div>
//   )
// }
