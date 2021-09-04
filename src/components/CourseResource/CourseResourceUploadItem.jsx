import { Progress, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components/macro'
import { X, ExclamationCircle } from 'styled-icons/heroicons-outline'

import { courseResourceUpload } from 'api/courseResources'
import { ButtonIconDanger } from 'components/shared/Buttons'
import { defaultFile, getFileDetails } from 'data/CourseResources'

const ToolTipTitle = () => (
  <TooltipContainer>
    <ExclamationCircle size="16" />
    <span>Please upload valid file</span>
  </TooltipContainer>
)

const CourseResourceUploadItem = ({
  file: fileItem,
  onChange: handleChange,
  onDelete: handleDelete,
}) => {
  const [fileDetails, setFileDetails] = useState(defaultFile)
  const [status, setStatus] = useState(null)
  const [title, setTitle] = useState('')
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      setFileDetails(getFileDetails(file))
      setStatus('success')
      // handleChange(file)
      setTitle(file.name.split('.').slice(0, -1).join('.'))

      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('title', title)
      formData.append('description', 'Default description')
      formData.append('tag', 'Resource')

      const onUploadProgress = (event) =>
        setProgress(Math.round((100 * event.loaded) / event.total))

      courseResourceUpload(formData, onUploadProgress).catch(() => {
        setProgress(0)
        setStatus('error')
        setFileDetails(defaultFile)
      })
    },
    [title]
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    maxFiles: 2,
    onDrop,
    // onDragEnter: () => setStatus('active'),
    // onDragLeave: () => setStatus('inactive'),
    // onDragOver: () => setStatus('active'),
  })

  // const reader = new FileReader()
  // reader.readAsDataURL(file)
  // reader.onloadend = () => {
  //   const base64 = reader.result
  //   setStatus('success')
  // }
  // reader.onerror = () => {
  //   setStatus('error')
  // }

  const deleteFileItem = () => {
    handleDelete(fileItem.id)
  }

  return (
    <ItemContainer>
      <StyledTooltip
        color="white"
        visible={status === 'error'}
        title={<ToolTipTitle />}
      >
        <UploadBox {...getRootProps()} status={status}>
          <img src={fileDetails.icon} className="icon" alt="icon" />

          <h3>
            {fileDetails.name}
            <br />
            {fileDetails.size && <small>{` (${fileDetails.size})`}</small>}
          </h3>

          {/* File input */}
          <input {...getInputProps()} />
        </UploadBox>

        {progress > 0 && progress < 100 && (
          <Progress size="small" percent={progress} />
        )}
      </StyledTooltip>

      <Input
        type="text"
        name="uploadTitle"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ButtonIconDanger
        icon={<X size="20" />}
        popover={fileDetails !== defaultFile}
        popoverTitle="Discard this upload?"
        onClick={deleteFileItem}
        defaultstyle={{ marginLeft: '1rem' }}
      />
    </ItemContainer>
  )
}

export default CourseResourceUploadItem

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
  border-radius: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  margin-bottom: 0;
  margin-left: 1rem;
  border: none;
  border-bottom: 1px solid lightgray;
  border-radius: 0;
  font-size: 0.875rem;
  background-color: transparent;
  box-shadow: none;

  &:focus {
    border-color: ${({ theme }) => theme.logo};
    outline: none;
    box-shadow: none;
  }
`

const UploadBox = styled.div`
  display: flex;
  align-items: center;
  width: 12rem;
  padding: 0.5rem;
  border: 2px dashed lightgray;
  border-radius: 0.5rem;
  color: ${({ status }) => (status === 'success' ? '#000000' : '#777777')};
  background-color: transparent;
  gap: 0.5rem;

  &:hover {
    background-color: #f5f5f5;
  }

  img {
    width: 1.5rem;
  }

  span {
    font-size: 0.75rem;
  }
`
