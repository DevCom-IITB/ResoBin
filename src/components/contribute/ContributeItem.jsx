import { Button, Input, Progress, Select, Tooltip } from 'antd'
import { rgba } from 'polished'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { X, ExclamationCircle, Upload } from 'styled-icons/heroicons-outline'

import { API } from 'api'
import { Form, LoaderAnimation } from 'components/shared'
import { ButtonIconDanger } from 'components/shared/Buttons'
import { toastError } from 'components/toast'
import { defaultFile, fileTypes, getFileDetails } from 'data/CourseResources'
import {
  selectResourceTags,
  selectCourseListMinified,
  selectCourseAPILoading,
} from 'store/courseSlice'

const ToolTipTitle = () => (
  <TooltipContainer>
    <ExclamationCircle size="16" />
    <span>Please upload valid file</span>
  </TooltipContainer>
)

const ContributeItem = ({ fileItem, updateFileItem, deleteFileItem }) => {
  // ? If no file is valid, reset the file list item
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      updateFileItem({
        file: null,
        status: 'error',
        details: defaultFile,
      })
    } else {
      updateFileItem({
        file: acceptedFiles[0],
        status: 'success',
        details: getFileDetails(acceptedFiles[0], fileItem.details),
      })
    }
  }

  const onUploadProgress = (event) =>
    updateFileItem({
      progress: Math.round((100 * event.loaded) / event.total),
    })

  const isValid = (fileDetails) => {
    if (fileDetails.status === 'success') return true
    return false
  }

  const handleUpload = async () => {
    updateFileItem({ status: 'uploading' })

    if (!isValid(fileItem)) {
      updateFileItem({ status: 'error' })
      return
    }

    const fd = new FormData()
    fd.append('file', fileItem.file, fileItem.file.name)
    fd.append('title', fileItem.details.title)
    fd.append('course', fileItem.details.course)
    fd.append('description', fileItem.details.description)
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
      toastError(error)
      updateFileItem({ status: 'error', progress: 0 })
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: fileTypes.map((file) => file.type),
    maxFiles: 1,
    onDrop,
    // onDragEnter: () => setStatus('active'),
    // onDragLeave: () => setStatus('inactive'),
    // onDragOver: () => setStatus('active'),
  })

  const handleDelete = async () => {
    if (fileItem.status === 'uploaded') {
      try {
        await API.resources.delete({ id: fileItem.response.id })
      } catch (error) {
        toastError(error)
        updateFileItem({ status: 'error', progress: 0 })
        return
      }
    }

    deleteFileItem(fileItem.id)
  }

  const tagOptions = useSelector(selectResourceTags)?.map(({ tag }) => ({
    label: tag,
    value: tag,
  }))

  const courseOptions = useSelector(selectCourseListMinified)?.map(
    ({ code, title }) => ({
      label: `${code}: ${title}`,
      value: code,
    })
  )

  const APILoading = useSelector(selectCourseAPILoading)

  return APILoading ? (
    <LoaderAnimation />
  ) : (
    <ItemContainer>
      <StyledTooltip
        color="white"
        visible={fileItem.status === 'error'}
        title={<ToolTipTitle />}
      >
        <UploadBox {...getRootProps()} status={fileItem.status}>
          <img src={fileItem.details.icon} className="icon" alt="icon" />

          <h3>
            {fileItem.details.name}
            <br />
            {fileItem.details.size && (
              <small>{` (${fileItem.details.size})`}</small>
            )}
          </h3>

          {/* File input */}
          <input {...getInputProps()} />
        </UploadBox>

        {fileItem.progress > 0 && fileItem.progress < 100 && (
          <Progress size="small" percent={fileItem.progress} />
        )}
      </StyledTooltip>

      <Form style={{ marginLeft: '1rem', gap: '1rem' }}>
        <Input
          type="text"
          name="uploadTitle"
          placeholder="Title"
          value={fileItem.details.title}
          onChange={(e) =>
            updateFileItem({
              details: {
                ...fileItem.details,
                title: e.target.value,
              },
            })
          }
        />

        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 10 }}
          placeholder="Description"
          value={fileItem.details.description}
          defaultValue="Not available"
          onChange={(e) =>
            updateFileItem({
              details: {
                ...fileItem.details,
                description: e.target.value,
              },
            })
          }
        />

        <Select
          showSearch
          placeholder="Course"
          options={courseOptions}
          value={fileItem.details.course}
          onChange={(value) =>
            updateFileItem({
              details: {
                ...fileItem.details,
                course: value,
              },
            })
          }
        />

        <Select
          mode="tags"
          placeholder="Add tags"
          showArrow
          tokenSeparators={[',']}
          options={tagOptions}
          value={fileItem.details.tags}
          onChange={(values) =>
            updateFileItem({
              details: {
                ...fileItem.details,
                tags: values,
              },
            })
          }
        />

        <Button
          style={{ marginTop: '0.5rem' }}
          icon={<Upload size="18" />}
          onClick={handleUpload}
          loading={fileItem.status === 'uploading'}
        >
          Upload
        </Button>
      </Form>

      <ButtonIconDanger
        icon={<X size="20" />}
        popover={fileItem.details !== defaultFile}
        popoverTitle="Discard this upload?"
        onClick={handleDelete}
        defaultstyle={{ marginLeft: '0.5rem' }}
      />
    </ItemContainer>
  )
}

export default ContributeItem

const StyledTooltip = styled(Tooltip)`
  cursor: pointer;
`

const TooltipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  gap: 3px;
`

const ItemContainer = styled.div`
  display: flex;
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.secondary};
`

const UploadBox = styled.div`
  display: flex;
  align-items: center;
  width: 12rem;
  height: 100%;
  padding: 0.5rem;

  /* padding-bottom: 1rem; */
  border: 2px dashed ${({ theme }) => rgba(theme.textColorInactive, 0.3)};
  border-radius: 0.5rem;
  color: ${({ status, theme }) =>
    status === 'success' ? theme.textColor : theme.textColorInactive};
  background-color: transparent;
  gap: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.darksecondary};
  }

  img {
    width: 1.5rem;
  }

  span {
    font-size: 0.75rem;
  }
`
