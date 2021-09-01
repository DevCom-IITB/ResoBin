import { Popconfirm, Tooltip } from 'antd'
import { useState } from 'react'
import styled from 'styled-components/macro'
import { X, ExclamationCircle } from 'styled-icons/heroicons-outline'

import { ButtonIcon } from 'components/shared'
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
  const [popoverVisible, setPopoverVisible] = useState(false)

  const readURL = (e) => {
    const file = e.target.files[0]
    const { isValid } = getFileDetails(file)
    setFileDetails(getFileDetails(file))

    // ? invalid file selected
    if (!isValid) {
      if (!file) setStatus(null)
      else setStatus('error')
      return
    }

    // handleChange()

    setStatus('loading')

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      // const base64 = reader.result
      setStatus('success')
    }

    reader.onerror = () => {
      setStatus('error')
    }
  }

  const deleteFileItem = () => {
    setPopoverVisible(false)
    handleDelete(fileItem.id)
  }

  const handleVisibleChange = (visible) => {
    if (!visible) {
      setPopoverVisible(false)
      return
    }

    // Show popover only if user has made changes
    if (fileDetails === defaultFile) deleteFileItem()
    else setPopoverVisible(true)
  }

  return (
    <ItemContainer>
      <StyledTooltip
        color="white"
        visible={status === 'error'}
        title={<ToolTipTitle />}
      >
        <UploadBox status={status}>
          <img src={fileDetails.icon} className="icon" alt="icon" />
          <h3 id="upload">
            {fileDetails.name}
            <br />
            {fileDetails.size && <small>{` (${fileDetails.size})`}</small>}
          </h3>
          <input type="file" className="upload up" id="up" onChange={readURL} />
        </UploadBox>
      </StyledTooltip>

      <Input type="text" name="" placeholder="Title" />

      <Popconfirm
        title="Are you sure?"
        icon={
          <ExclamationCircle
            style={{ position: 'absolute', top: '6px', color: 'red' }}
            size="16"
          />
        }
        visible={popoverVisible}
        onVisibleChange={handleVisibleChange}
        onConfirm={deleteFileItem}
        onCancel={() => setPopoverVisible(false)}
      >
        <ButtonIcon
          icon={<X size="20" />}
          color="red"
          defaultstyle={{ color: '#ff5050', marginLeft: '1rem' }}
        />
      </Popconfirm>
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
  align-items: center;
  border-radius: 0.5rem;

  /* background-color: ${({ theme }) => theme.secondary}; */
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
  position: relative;
  display: flex;
  align-items: center;
  width: 20rem;
  padding: 0.5rem;
  border: 1px solid lightgray;
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

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`
