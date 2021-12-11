import { Progress } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { DocumentAdd } from 'styled-icons/heroicons-outline'

import { LoaderAnimation, toast } from 'components/shared'
import { API } from 'config/api'
import { selectCourseAPILoading } from 'store/courseSlice'
import { device } from 'styles/responsive'

import ContributeForm from './ContributeForm'
import { DragNDropSub } from './DragNDrop'
import { getFileDetails } from './fileDetails'

const ContributeItem = ({ fileItem, updateFileItem, deleteFileItem }) => {
  // ? If no file is valid, reset the file list item
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 0)
      updateFileItem({
        file: acceptedFiles[0],
        status: 'success',
        details: getFileDetails(acceptedFiles[0], fileItem.details),
      })
  }

  const onUploadProgress = (event) =>
    updateFileItem({
      progress: Math.round((100 * event.loaded) / event.total),
    })

  const isValid = (fileDetails) => {
    if (fileDetails.status === 'success') return true
    return false
  }

  const handleUpload = async (fileDetails) => {
    updateFileItem({ status: 'uploading' })

    if (!isValid(fileItem)) {
      updateFileItem({ status: 'error' })
      return
    }

    const fd = new FormData()
    fd.append('file', fileItem.file, fileItem.file.name)
    fd.append('title', fileItem.details.title)
    fd.append('course', fileItem.details.course)
    fd.append('description', fileItem.details.description ?? '')
    fd.append('tags', JSON.stringify(fileItem.details.tags))

    try {
      const response = await API.resources.create({
        payload: fd,
        onUploadProgress,
      })
      const { id, timestamp, url } = response

      updateFileItem({
        status: 'uploaded',
        response: { id, timestamp, url },
      })
    } catch (error) {
      toast({ status: 'error', content: error })
      updateFileItem({ status: 'error', progress: 0 })
    }
  }

  const handleDelete = async () => {
    if (fileItem.status === 'uploaded') {
      try {
        await API.resources.delete({ id: fileItem.response.id })
      } catch (error) {
        toast({ status: 'error', content: error })
        updateFileItem({ status: 'error', progress: 0 })
        return
      }
    }

    deleteFileItem(fileItem.id)
  }

  const APILoading = useSelector(selectCourseAPILoading)
  if (APILoading) return <LoaderAnimation />

  return (
    <ItemContainer>
      <DragNDropSub onDrop={onDrop}>
        {/* <img src={fileItem.details.icon} className="icon" alt="icon" /> */}
        <DocumentAdd size="28" />

        <h2>
          {fileItem.details.name}
          <br />
          {fileItem.details.size && (
            <small>{` (${fileItem.details.size})`}</small>
          )}
        </h2>

        {fileItem.progress > 0 && fileItem.progress < 100 && (
          <Progress size="small" percent={fileItem.progress} />
        )}
      </DragNDropSub>

      <ContributeForm
        fileItem={fileItem}
        updateFileItem={updateFileItem}
        handleUpload={handleUpload}
        handleDelete={handleDelete}
      />
    </ItemContainer>
  )
}

export default ContributeItem

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0.75rem;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;

  @media ${device.max.xs} {
    padding: 1rem 0.75rem;
    flex-direction: column;
  }
`
