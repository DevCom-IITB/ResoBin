import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components/macro'
import { Plus } from 'styled-icons/heroicons-outline'

import { API } from 'api'
import { CourseResourceGrid } from 'components/CourseResource/CourseResourceItem'
import {
  ButtonSquare,
  LoaderAnimation,
  PageHeading,
  PageTitle,
} from 'components/shared'
import { toastError } from 'components/toast'
import { defaultFile, fileTypes } from 'data/CourseResources'
import { device } from 'styles/responsive'

import ContributeItem from './ContributeItem'

const defaultFileItem = (details) => ({
  id: nanoid(),
  status: null,
  progress: 0,
  file: null,
  details: { ...defaultFile, ...details },
})

const ContributeContainer = ({ visible, setVisible }) => {
  const location = useLocation()
  const queryString = new URLSearchParams(location.search)
  const course = queryString.get('course')

  const [fileList, setFileList] = useState([defaultFileItem({ course })])
  const [myResources, setMyResources] = useState([])
  const [APILoading, setAPILoading] = useState(false)
  // const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchUserResources = async () => {
      try {
        setAPILoading(true)
        const response = await API.profile.resources.list()
        setMyResources(response)
      } catch (error) {
        toastError(error)
      } finally {
        setAPILoading(false)
      }
    }

    fetchUserResources()
  }, [])

  const createFileItem = useCallback(() => {
    setFileList((prevItems) => [...prevItems, defaultFileItem({ course })])
  }, [course])

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

      <ButtonSquare
        icon={<Plus size="18" style={{ marginRight: '0.25rem' }} />}
        onClick={createFileItem}
        style={{ marginLeft: '1rem' }}
      >
        Add new
      </ButtonSquare>

      <PageTitle>My uploads</PageTitle>
      <LoaderAnimation fixed disable={!APILoading} />

      <CourseResourceGrid items={myResources} />
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
