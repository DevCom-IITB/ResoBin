import { Modal, Button } from 'antd'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import styled from 'styled-components/macro'
import { Plus } from 'styled-icons/heroicons-outline'

import { fileTypes } from 'data/CourseResources'

import CourseResourceUploadItem from './CourseResourceUploadItem'

const createFileItem = (title = '', file = null) => ({
  id: nanoid(),
  title,
  file,
})

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

  const [fileList, setFileList] = useState([createFileItem()])

  const addNewFile = () =>
    setFileList((prevItems) => [...prevItems, createFileItem()])

  return (
    <StyledModal
      title={<h2>Contribute resources</h2>}
      maskClosable={false}
      visible={visible}
      okText="Upload"
      onOk={handleOk}
      confirmLoading={uploading}
      onCancel={handleCancel}
      width="50rem"
    >
      <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
        Please upload documents only in the following formats:
        {fileTypes.map(({ extention }) => (
          <code key={extention}> {extention}</code>
        ))}
      </p>

      <FileList>
        {fileList.map((fileItem) => (
          <CourseResourceUploadItem
            key={fileItem.name}
            file={fileItem}
            uploading={uploading}
          />
        ))}
      </FileList>

      <Button
        style={{ marginTop: '0.5rem' }}
        icon={<Plus size="18" />}
        onClick={addNewFile}
      >
        Add new
      </Button>
    </StyledModal>
  )
}

export default MultiFileUpload

const FileList = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  height: 21rem;
  padding: 1rem 0;
  gap: 1rem;
`

const StyledModal = styled(Modal)`
  top: 3rem;
  overflow-y: hidden;
  max-height: calc(100% - 4rem);
`
