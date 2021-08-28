import { Button, Popconfirm } from 'antd'
import { useState } from 'react'
import styled from 'styled-components/macro'
import { X, ExclamationCircle } from 'styled-icons/heroicons-outline'

import fileTypes from './__mock__/fileTypes'

const CourseResourceUploadItem = () => {
  const [fileName, setFileName] = useState('Upload document')
  const [fileIcon, setFileIcon] = useState(fileTypes[''])

  const readURL = (e) => {
    setFileName(e.target.files[0].name)
    setFileIcon(fileTypes[e.target.files[0].type] || fileTypes[''])
    // const fileName = e.target.files[0]?.name
    // if (!fileName) return

    // const fileType = fileName.split('.').pop().toLowerCase()

    // console.log(e)
    // // if (fileTypes.includes(fileType)) {
    // const reader = new FileReader()
    // reader.onload = (event) => {
    //   console.log(event)
    //   const src = event?.target?.result
    //   console.log(src)
    //   // setPreview(src)
    // }
    // // reader.readAsDataURL(fileName)
    // // } else {
    // // console.log('invalid file type')
    // // }
  }

  return (
    <>
      <ItemContainer>
        <UploadBox>
          {/* <div className="docErr">Please upload valid file</div> */}
          <img src={fileIcon} className="icon" alt="icon" />

          <span id="upload">{fileName}</span>
          <input type="file" className="upload up" id="up" onChange={readURL} />
        </UploadBox>

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
    </>
  )
}

export default CourseResourceUploadItem

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  margin-bottom: 1rem;
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

  /* overflow: hidden; */
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #777777;
  background-color: transparent;
  cursor: pointer;
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
  }

  /* .docErr {
    position: absolute;
    top: -56px;
    right: auto;
    left: 10px;
    display: none;
    padding: 10px;
    font-size: 15px;
    color: red;
    background-color: #ffffff;
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.2);

    &::after {
      content: '\f0d7';
      position: absolute;
      bottom: -40px;
      left: 30px;
      display: inline-block;
      font-size: 50px;
      font-family: FontAwesome, sans-serif;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
      color: #ffffff;
    }
  } */
`