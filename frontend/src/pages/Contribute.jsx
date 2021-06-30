import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { FileDetails, FileList } from 'components/contribute'

const Container = styled.div`
  margin-left: 11.5rem;
`

const Contribute = () => {
  return (
    <Container>
      <Helmet>
        <title>Contribute - ResoBin</title>
        <meta name="description" content="Upload and share your own notes" />
      </Helmet>

      <FileDetails />
      <FileList />
    </Container>
  )
}

export default Contribute
