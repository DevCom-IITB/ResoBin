/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Progress, Select, Tooltip } from 'antd'
import { rgba } from 'polished'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import styled from 'styled-components/macro'
import { X, ExclamationCircle } from 'styled-icons/heroicons-outline'

import { API } from 'api'
import { ButtonIconDanger } from 'components/shared/Buttons'
import { defaultFile, fileTypes, getFileDetails } from 'data/CourseResources'
import { selectResourceTags } from 'store/courseSlice'

const ToolTipTitle = () => (
  <TooltipContainer>
    <ExclamationCircle size="16" />
    <span>Please upload valid file</span>
  </TooltipContainer>
)

const CourseResourceUploadItem = ({
  fileItem,
  updateFileItem,
  deleteFileItem,
}) => {
  const [fileDetails, setFileDetails] = useState(defaultFile)
  const [status, setStatus] = useState(null)
  const [title, setTitle] = useState('')
  const [progress, setProgress] = useState(0)
  const { courseCode } = useParams()

  const reset = () => {
    setFileDetails(defaultFile)
    setStatus(null)
    setTitle('')
    setProgress(0)
  }

  // ? If no file is valid, reset the file list item
  const onDrop = useCallback(
    (acceptedFiles) =>
      acceptedFiles.length === 0
        ? reset()
        : updateFileItem({ file: acceptedFiles[0] }),
    [updateFileItem]
  )

  useEffect(() => {
    if (fileItem.file) {
      const details = getFileDetails(fileItem.file)

      updateFileItem({
        details: {
          ...fileItem.details,
          course: courseCode,
          title: details.title,
        },
      })
    } else {
      updateFileItem({
        details: {
          icon: defaultFile.icon,
          title: '',
          description: '',
          tags: [],
          size: defaultFile.type,
          type: defaultFile.type,
        },
      })
    }
  }, [fileItem.file])

  // setFileDetails(getFileDetails(file))

  // updateInList({ ...fileItem, file })
  // setStatus('success')

  // setTitle(file.name.split('.').slice(0, -1).join('.'))

  // const formData = new FormData()
  // formData.append('file', file, file.name)
  // formData.append('course', courseCode)
  // formData.append('title', title)
  // formData.append('description', 'Default description')
  // formData.append('tag', 'Resource')

  // const onUploadProgress = (event) =>
  //   setProgress(Math.round((100 * event.loaded) / event.total))

  // try {
  //   const response = await API.resources.create({
  //     payload: formData,
  //     onUploadProgress,
  //   })
  //   const res = {
  //     id: '8fa6908b-4aab-4baa-9163-23b23d86c84d',
  //     file: 'http://localhost:8000/media/resources/AE102/8fa6908b-4aab-4baa-9163-23b23d86c84d_Tut2_CL305_190020044.pdf',
  //     title: 'Tut2_CL305_190020044',
  //     description: 'Default description',
  //     tags: [],
  //     timestamp: '2021-09-25T05:53:56.893921+05:30',
  //   }

  //   console.log(response)
  // } catch {
  //   setProgress(0)
  //   setStatus('error')
  //   setFileDetails(defaultFile)
  // }

  const { getRootProps, getInputProps } = useDropzone({
    accept: fileTypes.map(({ type }) => type),
    maxFiles: 1,
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

  const handleDelete = async () => {
    try {
      await API.resources.delete({ id: fileItem.id })
    } catch {
      setProgress(0)
      setStatus('error')
      setFileDetails(defaultFile)
    }

    deleteFileItem(fileItem.id)
  }

  const tagOptions = useSelector(selectResourceTags)?.map(({ tag }) => ({
    label: tag,
    value: tag,
  }))

  const handleChange = (value) => {
    console.log('Tags:', value)
  }

  const [courseOptions, setCourseOptions] = useState([])

  useEffect(() => {
    const getData = async () =>
      API.courses
        .list({
          params: { fields: 'code,title', page_size: 0 },
        })
        .then((res) =>
          res.data.map((course) => ({
            label: `${course.code}: ${course.title}`,
            value: course.code,
          }))
        )
        .then((res) => setCourseOptions(res))
        .catch((error) => console.log(error))

    getData()
  }, [])

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

      <DetailsForm>
        <Input
          type="text"
          name="uploadTitle"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 10 }}
          placeholder="Description"
        />

        <Select
          showSearch
          placeholder="Course"
          // optionFilterProp="children"
          onChange={handleChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          // filterOption={(input, option) =>
          //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
          options={courseOptions}
        />

        <Select
          mode="tags"
          placeholder="Add tags"
          onChange={handleChange}
          showArrow
          tokenSeparators={[',']}
          options={tagOptions}
        />
      </DetailsForm>

      <ButtonIconDanger
        icon={<X size="20" />}
        popover={fileDetails !== defaultFile}
        popoverTitle="Discard this upload?"
        onClick={handleDelete}
        defaultstyle={{ marginLeft: '0.5rem' }}
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
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.secondary};
`

const UploadBox = styled.div`
  display: flex;
  align-items: center;
  width: 9rem;
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

const DetailsForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 1rem;
  gap: 1rem;

  /* For icons */
  span.anticon {
    color: white;
  }

  .ant-select .ant-select-selection-item {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-overflow-item .ant-select-selection-item {
    height: 1.5rem;
    border: 1px solid ${({ theme }) => rgba(theme.textColorInactive, 0.3)};
    background-color: ${({ theme }) => theme.darksecondary};
  }

  .ant-input {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .ant-select-focused,
  .ant-select-open {
    .ant-select-selector {
      border-color: ${({ theme }) => theme.textColorInactive} !important;
      box-shadow: none !important;
    }
  }

  .ant-select .ant-select-selector,
  .ant-input {
    display: flex;
    align-items: center;
    border: none;
    border-bottom: solid 1px
      ${({ theme }) => rgba(theme.textColorInactive, 0.3)};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.textColor};
    background-color: transparent;

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.textColorInactive};
      box-shadow: none !important;
    }
  }
`
