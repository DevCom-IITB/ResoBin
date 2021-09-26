import {
  // Modal,
  Button,
} from 'antd'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Plus } from 'styled-icons/heroicons-outline'

import { PageHeading, PageTitle } from 'components/shared'
import { device } from 'styles/responsive'

import ContributeItem from './ContributeItem'

const defaultFileItem = () => ({
  id: nanoid(),
  status: null,
  file: null,
  details: {},
})

const CourseResourceUploadModal = ({ visible, setVisible }) => {
  const [fileList, setFileList] = useState([defaultFileItem()])

  const createFileItem = useCallback(() => {
    setFileList((prevItems) => [...prevItems, defaultFileItem()])
  }, [])

  const updateFileItem = (id) => (fileItem) =>
    setFileList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...fileItem } : item
      )
    )

  const deleteFileItem = (id) => () => {
    if (fileList.length === 1) createFileItem()
    setFileList((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <Container>
      <PageHeading>
        <PageTitle>Contribute</PageTitle>
      </PageHeading>

      <FileList>
        {fileList.map((fileItem) => (
          <ContributeItem
            key={fileItem.id}
            fileItem={fileItem}
            updateFileItem={updateFileItem(fileItem.id)}
            deleteFileItem={deleteFileItem(fileItem.id)}
            // uploading={uploading}
          />
        ))}
      </FileList>

      <Button
        style={{ marginTop: '0.5rem' }}
        icon={<Plus size="18" />}
        onClick={createFileItem}
      >
        Add new
      </Button>
    </Container>
  )
}

export default CourseResourceUploadModal

const Container = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  padding-top: 0.5rem;

  @media ${device.min.lg} {
    margin-right: ${({ theme }) => theme.asideWidthRight};
  }
`

const FileList = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  height: calc(100% - 20rem);
  padding: 1rem 0;
  gap: 1rem;
`
