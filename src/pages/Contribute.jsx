import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { FileDetails, FileList } from 'components/contribute'

const Container = styled.div``

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
