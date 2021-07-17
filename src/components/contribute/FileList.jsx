import { InboxOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

import Divider from 'components/shared/Divider'

const ContainerAside = styled.div`
  position: fixed;
  top: 3rem;
  right: 0;
  z-index: 7; /* To put searchbar at the bottom */
  width: ${({ theme }) => theme.asideWidth};
  height: 100%;
  padding: 2rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  box-shadow: inset 2px 0 5px rgba(0, 0, 0, 0.3);
`

const Title = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const Button = styled.button`
  padding: 3px 4px;
  margin-top: 3rem;
  border-radius: 5px;
  font-style: normal;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: 1.5px;
  color: black;
`

const { Dragger } = Upload
const FileList = (props) => {
  const [selectedFile, setSelectedFile] = useState('')

  const submitForm = (data) => {
    const formData = new FormData()

    formData.append(
      'model',
      JSON.stringify({
        resourcetype: data.formvalues.resourcetype,
        renamefile: data.formvalues.renamefile,
        description: data.formvalues.description,
        coursecode: data.formvalues.coursecode,
        semester: data.formvalues.semester,
        year: data.formvalues.year,
        professor: data.formvalues.professor,
      })
    )
    formData.append('file', selectedFile)

    console.log(data.formvalues.resourcetype)
    // #  axios.post(UPLOAD_URL, formData)
    // .then((res) => {
    //      alert("File Upload success");
    // })
    // .catch((err) => alert("File Upload Error"));
    // console.log(formData['resourcetype'])
  }

  const handleUpload = (info) => {
    // let files = e.target.files;

    if (info.fileList) {
      setSelectedFile(info.fileList[0].originFileObj)
    } else {
      setSelectedFile('')
    }
  }

  return (
    <ContainerAside>
      <Title> Files </Title>
      <Divider />
      <div style={{ height: '200px' }}>
        <Dragger onChange={handleUpload} beforeUpload={() => false}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </div>
      <Button type="button" onClick={submitForm(props)}>
        Submit
      </Button>
    </ContainerAside>
  )
}

export default FileList
