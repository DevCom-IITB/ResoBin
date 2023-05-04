import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'

// import { CourseResourceGrid } from 'components/CourseResource'
import {
  Aside,
  Divider,
  PageHeading,
  PageTitle,
  toast,
} from 'components/shared'
// import { API } from 'config/api'

import ContributeItem from './ContributeItem'
import DragNDrop from './DragNDrop'
import { getFileDetails } from './fileDetails'

const ContributeContainer = ({ visible, setVisible }) => {
  const [filesSelected, setFilesSelected] = useState([])
  // const [uploadedFiles, setUploadedFiles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserResources = async () => {
      try {
        setLoading(true)
        // const response = await API.profile.resources.list()
        // setUploadedFiles(response)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    fetchUserResources()
  }, [])

  const updateFileItem = (id) => (fileItem) => {
    setFilesSelected((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...fileItem } : item
      )
    )
  }

  const deleteFileItem = (id) => () =>
    setFilesSelected((prevItems) => prevItems.filter((item) => item.id !== id))

  // const addUploadedFile = (file) =>
  //   setUploadedFiles((prevItems) => [file, ...prevItems])

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        toast({
          status: 'error',
          content: err.message,
        })
      })
    })

    acceptedFiles.forEach((file) => {
      const fileItem = {
        id: nanoid(),
        status: null,
        progress: 0,
        file,
        details: getFileDetails(file),
      }

      setFilesSelected((prevItems) => [...prevItems, fileItem])
    })
  }, [])

  return (
    <>
      <PageHeading>
        <PageTitle>Contribute</PageTitle>
      </PageHeading>

      <DragNDrop onDrop={onDrop} />

      {filesSelected.length > 0 && (
        <FileList>
          <Divider orientation="left">Files selected</Divider>

          {filesSelected.map((fileItem) => (
            <ContributeItem
              key={fileItem.id}
              fileItem={fileItem}
              updateFileItem={updateFileItem(fileItem.id)}
              deleteFileItem={deleteFileItem(fileItem.id)}
              // addUploadedFile={addUploadedFile}
            />
          ))}
        </FileList>
      )}

      <Aside title="Instructions" loading={loading}>
        {/* <CourseResourceGrid items={uploadedFiles} /> */}
        <InstructionContainer>
          <ul
            style={{
              paddingLeft: '1rem',
            }}
          >
            <Lis>
              Please ensure that the resources you upload are not dupscates of
              existing resources.
            </Lis>
            <Lis>
              Please name the files sensibly. Avoid using the course nsame,
              professor name, year, your name, roll number, etc in the file
              <span>&#39;</span>s name. Convert the files to pdf if possible.
            </Lis>
            <Lis>
              Select the year, professor name and module name as applicsable. If
              there is no module available, please reach out to us. Providing
              this data helps us serve these resources in an organized way.
            </Lis>
            <Lis>
              Files larger than 30MB cannot be uploaded through the portal. If
              you have larger files, please send them to us via email.
            </Lis>
          </ul>
          For any queries, reach out to us at devcom@iitb.ac.in
          <br />
          Thank you
        </InstructionContainer>
      </Aside>
    </>
  )
}

export default ContributeContainer

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`
const InstructionContainer = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 0.875rem;
`
const Lis = styled.li`
  list-style-type: disc;
`
