import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { CourseResourceGrid } from 'components/CourseResource'
import {
  Aside,
  Divider,
  PageHeading,
  PageTitle,
  toast,
} from 'components/shared'
import { API } from 'config/api'

import ContributeItem from './ContributeItem'
import DragNDrop from './DragNDrop'
import { getFileDetails } from './fileDetails'

const ContributeContainer = ({ visible, setVisible }) => {
  const [filesSelected, setFilesSelected] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserResources = async () => {
      try {
        setLoading(true)
        const response = await API.profile.resources.list()
        setUploadedFiles(response)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    fetchUserResources()
  }, [])

  const updateFileItem = (id) => (fileItem) => {
    setFilesSelected((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...fileItem } : item
      )
    )
  }

  const deleteFileItem = (id) => () =>
    setFilesSelected((prevItems) => prevItems.filter((item) => item.id !== id))

  const addUploadedFile = (file) => {
    setLoading(true)
    setUploadedFiles((prevItems) => [file, ...prevItems])
    setLoading(false)
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fileItem = {
        id: nanoid(),
        status: null,
        progress: 0,
        file,
        details: getFileDetails(file),
      }

      setFilesSelected((prevItems) => [...prevItems, fileItem])
    })
  }, [])

  return (
    <>
      <PageHeading>
        <PageTitle>Contribute</PageTitle>
      </PageHeading>

      <DragNDrop onDrop={onDrop} />

      {filesSelected.length > 0 && (
        <FileList>
          <Divider orientation="left">Files selected</Divider>

          {filesSelected.map((fileItem) => (
            <ContributeItem
              key={fileItem.id}
              fileItem={fileItem}
              updateFileItem={updateFileItem(fileItem.id)}
              deleteFileItem={deleteFileItem(fileItem.id)}
              addUploadedFile={addUploadedFile}
            />
          ))}
        </FileList>
      )}

      <Aside title="My uploads" loading={loading}>
        <CourseResourceGrid items={uploadedFiles} />
      </Aside>
    </>
  )
}

export default ContributeContainer

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`
