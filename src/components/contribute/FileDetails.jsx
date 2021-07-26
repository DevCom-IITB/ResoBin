import styled from 'styled-components/macro'

import { FileDetailsForm } from 'components/contribute'
import { PageHeading, PageTitle } from 'components/shared'
import { device } from 'styles/responsive'

const Container = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  padding-top: 0.5rem;

  @media ${device.min.lg} {
    margin-right: ${({ theme }) => theme.asideWidthRight};
  }
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
