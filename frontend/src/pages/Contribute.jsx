import styled from 'styled-components'
import { FileDetails, FileList } from 'components/contribute'

const Container = styled.div`
  margin-left: 11.5rem;
`

const Contribute = () => {
  return (
    <Container>
      <FileDetails />
      <FileList />
    </Container>
  )
}

export default Contribute
