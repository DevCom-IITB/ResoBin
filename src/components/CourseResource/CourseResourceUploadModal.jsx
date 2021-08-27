import { Modal, Button } from 'antd'
import { useState } from 'react'
import { Plus } from 'styled-icons/heroicons-outline'

import CourseResourceUploadItem from './CourseResourceUploadItem'

const fileTypes = ['pdf', 'docx', 'rtf', 'jpg', 'jpeg', 'png', 'txt']

const file = {
  id: 1,
  name: '',
  type: '',
  size: 0,
  lastModified: '',
  path: '',
}

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

  const fileList = []

  const newFile = () => {
    fileList.push(file)
  }

  return (
    <Modal
      title="Contribute resources"
      maskClosable={false}
      visible={visible}
      okText="Upload"
      onOk={handleOk}
      confirmLoading={uploading}
      onCancel={handleCancel}
      width="50rem"
      style={{ top: '3rem' }}
    >
      <h1>My documents</h1>

      <p style={{ marginBottom: '1.5rem' }}>
        Please upload documents only in the following formats:
        <br />
        {fileTypes.map((format) => (
          <code key={format}> {format}</code>
        ))}
      </p>

      {fileList.map((fileItem) => (
        <CourseResourceUploadItem
          key={fileItem.name}
          file={fileItem}
          uploading={uploading}
        />
      ))}

      <CourseResourceUploadItem fileTypes={fileTypes} />

      <Button icon={<Plus size="18" />} onClick={newFile}>
        Add new
      </Button>
    </Modal>
  )
}

export default MultiFileUpload
