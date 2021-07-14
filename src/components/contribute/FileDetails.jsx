import styled from 'styled-components'

import { FileDetailsForm } from 'components/contribute'
import { PageHeading, PageTitle } from 'components/shared'

const Container = styled.div`
  padding-top: 0.5rem;
`

const FileDetails = (props) => {
  const handleParentFun = (value) => {
    const formdetails = value
    props.handleFormdetail(formdetails)
  }

  return (
    <Container>
      <PageHeading>
        <PageTitle>File Details</PageTitle>
      </PageHeading>

      <FileDetailsForm
        handleParentFun={(value) => {
          handleParentFun(value)
        }}
      />
    </Container>
  )
}

export default FileDetails
