import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Plus } from 'styled-icons/heroicons-outline'

import { CourseResourceGrid } from 'components/CourseResource'
import { Aside, ButtonSquare, PageTitle, toast } from 'components/shared'
import { API } from 'config/api'
import { defaultFile, fileTypes } from 'data/CourseResources'
import { useResponsive } from 'hooks'

import ContributeItem from './ContributeItem'

const defaultFileItem = (details) => ({
  id: nanoid(),
  status: null,
  progress: 0,
  file: null,
  details: { ...defaultFile, ...details },
})

const ContributeContainer = ({ visible, setVisible }) => {
  const { isDesktop } = useResponsive()
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
        toast({ status: 'error', content: error })
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
    <>
      <PageTitle style={{ fontSize: '1rem' }}>
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

      <Aside title="My uploads" loading={APILoading} visible={isDesktop}>
        <CourseResourceGrid items={myResources} />
      </Aside>
    </>
  )
}

export default ContributeContainer

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
`
