import { Button, Popconfirm, Tooltip } from 'antd'
import { useState } from 'react'
import styled from 'styled-components/macro'
import { X, ExclamationCircle } from 'styled-icons/heroicons-outline'

import { defaultFile, getFileDetails } from 'data/CourseResources'

const ToolTipTitle = () => (
  <TooltipContainer>
    <ExclamationCircle size="16" />
    <span>Please upload valid file</span>
  </TooltipContainer>
)

const CourseResourceUploadItem = () => {
  const [fileName, setFileName] = useState(defaultFile.name)
  const [fileIcon, setFileIcon] = useState(defaultFile.icon)
  const [status, setStatus] = useState(null)

  const readURL = (e) => {
    const file = e.target.files[0]
    const { name, icon, isValid } = getFileDetails(file)

    // ? invalid file selected
    if (!isValid) {
      setStatus('error')
      setFileName(name)
      setFileIcon(defaultFile.icon)
      return
    }

    setStatus('loading')
    setFileName(name)
    setFileIcon(icon)

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      const base64 = reader.result
      setStatus('success')
    }

    reader.onerror = () => {
      setStatus('error')
    }
  }

  return (
    <ItemContainer>
      <Tooltip
        color="white"
        visible={status === 'error'}
        title={<ToolTipTitle />}
      >
        <UploadBox>
          <img src={fileIcon} className="icon" alt="icon" />
          <span id="upload">{fileName}</span>
          <input type="file" className="upload up" id="up" onChange={readURL} />
        </UploadBox>
      </Tooltip>

      <Input type="text" name="" placeholder="Title" />

      <Popconfirm
        title="Are you sure?"
        icon={
          <ExclamationCircle
            style={{ position: 'absolute', width: '0.8rem', color: 'red' }}
          />
        }
      >
        <Button
          shape="circle"
          type="text"
          danger
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '1rem',
          }}
          icon={<X size="24" />}
          size="large"
        />
      </Popconfirm>
    </ItemContainer>
  )
}

export default CourseResourceUploadItem

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
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: white;
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
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #777777;
  background-color: transparent;
  gap: 0.5rem;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
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
  }
`
