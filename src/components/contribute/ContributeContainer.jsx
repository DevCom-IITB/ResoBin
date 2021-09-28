/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'antd'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Plus } from 'styled-icons/heroicons-outline'

import { API } from 'api'
import { PageHeading, PageTitle } from 'components/shared'
import { defaultFile, fileTypes } from 'data/CourseResources'
import { selectUserProfile } from 'store/userSlice'
import { device } from 'styles/responsive'

import ContributeItem from './ContributeItem'

const defaultFileItem = () => ({
  id: nanoid(),
  status: null,
  progress: 0,
  file: null,
  details: defaultFile,
})

const ContributeContainer = ({ visible, setVisible }) => {
  const [fileList, setFileList] = useState([defaultFileItem()])
  const { resourcesPosted } = useSelector(selectUserProfile)
  const [myResources, setMyResources] = useState([])

  useEffect(() => {
    resourcesPosted.forEach(async (id) => {
      const response = await API.resources.read({ id })
      setMyResources((prev) => [...prev, response])
    })
  }, [])
  // const [uploading, setUploading] = useState(false)

  const createFileItem = useCallback(() => {
    setFileList((prevItems) => [...prevItems, defaultFileItem()])
  }, [])

  const updateFileItem = (id) => (fileItem) => {
    setFileList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...fileItem } : item
      )
    )
  }

  const deleteFileItem = (id) => () => {
    if (fileList.length === 1) createFileItem()
    setFileList((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <Container>
      <PageHeading>
        <PageTitle>Contribute</PageTitle>
      </PageHeading>
      <PageTitle style={{ padding: '1.5rem', fontSize: '1rem' }}>
        Please upload documents only in the following formats:
        {fileTypes.map(({ extention }) => (
          <code key={extention}> {extention}</code>
        ))}
      </PageTitle>

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

      {myResources.map((resource) => (
        <div key={resource.id} style={{ color: 'white', padding: '1rem' }}>
          <h3>
            <a href={resource.file}>{resource.title}</a>
          </h3>
          <p>{resource.description}</p>
        </div>
      ))}
    </Container>
  )
}

export default ContributeContainer

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
