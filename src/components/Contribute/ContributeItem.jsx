import { DocumentAdd } from '@styled-icons/heroicons-outline'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { LoaderAnimation, Progress, toast } from 'components/shared'
import { API } from 'config/api'
import { selectCourseAPILoading } from 'store/courseSlice'
import { device } from 'styles/responsive'

import ContributeForm from './ContributeForm'
import { DragNDropSub } from './DragNDrop'
import { getFileDetails } from './fileDetails'

const ContributeItem = ({
  fileItem,
  updateFileItem,
  deleteFileItem,
  addUploadedFile,
}) => {
  // ? If no file is valid, reset the file list item
  const onDrop = (acceptedFiles, fileRejections) => {
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        toast({
          status: 'error',
          content: err.message,
        })
      })
    })

    if (acceptedFiles.length !== 0)
      updateFileItem({
        file: acceptedFiles[0],
        status: 'success',
        details: getFileDetails(acceptedFiles[0]),
      })
  }

  const onUploadProgress = (event) =>
    updateFileItem({
      progress: Math.round((100 * event.loaded) / event.total),
    })

  const handleUpload = async (fileDetails) => {
    updateFileItem({ status: 'uploading' })

    const MAX_FILE_SIZE = 26214400 // 25MB

    if (!fileItem.file || fileItem.file.size > MAX_FILE_SIZE) {
      updateFileItem({ status: 'error' })
      return
    }

    const { title, course, description, tags, author } = fileDetails

    const fd = new FormData()
    fd.append('file', fileItem.file, fileItem.file.name)
    fd.append('title', title)
    fd.append('author', author)
    fd.append('course', course)
    fd.append('description', description || 'No description available.')
    fd.append('tags', JSON.stringify(tags))

    try {
      // const response = await API.resources.create({
      //   payload: fd,
      //   onUploadProgress,
      // })
      // addUploadedFile(response)
      await API.resources.create({ payload: fd, onUploadProgress })

      deleteFileItem()
      toast({
        status: 'success',
        content:
          'Resource uploaded successfully! Pending moderator approval (1-2 days).',
      })
    } catch (error) {
      toast({ status: 'error', content: error })
      updateFileItem({ status: 'error', progress: 0 })
    }
  }

  const APILoading = useSelector(selectCourseAPILoading)
  if (APILoading) return <LoaderAnimation />

  return (
    <ItemContainer>
      <DragNDropSub onDrop={onDrop}>
        <DocumentAdd size="24" />

        <h2>
          {fileItem.details.name}
          <br />
          {fileItem.details.size && (
            <small>{` (${fileItem.details.size})`}</small>
          )}
        </h2>

        {fileItem.progress > 0 && (
          <Progress
            size="small"
            percent={fileItem.progress}
            style={{
              top: '10px',
              marginTop: '-10px',
            }}
          />
        )}
      </DragNDropSub>

      <ContributeForm
        fileItem={fileItem}
        handleUpload={handleUpload}
        handleDelete={deleteFileItem}
      />
    </ItemContainer>
  )
}

export default ContributeItem

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0.75rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  @media ${device.max.xs} {
    flex-direction: column;
    padding: 1rem 0.75rem;
  }
`
