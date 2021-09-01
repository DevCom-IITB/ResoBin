import { Modal, Button } from 'antd'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Plus } from 'styled-icons/heroicons-outline'

import { fileTypes } from 'data/CourseResources'

import CourseResourceUploadItem from './CourseResourceUploadItem'

const CourseResourceUploadModal = ({ visible, setVisible }) => {
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)

  const handleModalCancel = () => setVisible(false)
  const handleModalOk = () => {
    setUploading(true)
    setTimeout(() => {
      setVisible(false)
      setUploading(false)
    }, 2000)
  }

  const createFileItem = (title = '', file = null) => ({
    id: nanoid(),
    title,
    file,
  })

  const handleFileItemAdd = useCallback(() => {
    setFileList((prevItems) => [...prevItems, createFileItem()])
  }, [])

  const handleFileItemDelete = (id) =>
    setFileList((prevItems) => prevItems.filter((item) => item.id !== id))

  const handleFileItemChange = (id, fileItem) =>
    setFileList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...fileItem } : item
      )
    )

  useEffect(() => {
    if (fileList.length === 0) handleFileItemAdd()
  }, [handleFileItemAdd, fileList])

  return (
    <StyledModal
      title={<h2>Contribute resources</h2>}
      maskClosable={false}
      visible={visible}
      okText="Upload"
      onOk={handleModalOk}
      confirmLoading={uploading}
      onCancel={handleModalCancel}
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
            key={fileItem.id}
            file={fileItem}
            onChange={handleFileItemChange}
            onDelete={handleFileItemDelete}
            // uploading={uploading}
          />
        ))}
      </FileList>

      <Button
        style={{ marginTop: '0.5rem' }}
        icon={<Plus size="18" />}
        onClick={handleFileItemAdd}
      >
        Add new
      </Button>
    </StyledModal>
  )
}

export default CourseResourceUploadModal

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
  border-radius: 0.5rem;

  /* .ant-modal-body {
    background-color: ${({ theme }) => theme.darksecondary};
  } */
`
