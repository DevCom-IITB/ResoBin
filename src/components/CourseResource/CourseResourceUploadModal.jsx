import { Modal, Button } from 'antd'
import { useState } from 'react'
import { Plus } from 'styled-icons/heroicons-outline'

const formats = ['pdf', 'docx', 'rtf', 'jpg', 'jpeg', 'png', 'txt']

const MultiFileUpload = ({ visible, setVisible }) => {
  const [uploading, setUploading] = useState(false)

  const handleOk = () => {
    setUploading(true)

    setTimeout(() => {
      setVisible(false)
      setUploading(false)
    }, 2000)
  }

  const handleCancel = () => setVisible(false)

  return (
    <Modal
      title="Contribute resources"
      maskClosable={false}
      visible={visible}
      okText="Upload"
      onOk={handleOk}
      confirmLoading={uploading}
      onCancel={handleCancel}
    >
      <div>
        <h1>My documents</h1>

        <p>
          Please upload documents only in the following formats:
          <br />
          {formats.map((format) => (
            <code key={format}> {format}</code>
          ))}
        </p>

        <Button icon={<Plus size="18" />}>Add new</Button>
      </div>
    </Modal>
  )
}

export default MultiFileUpload
