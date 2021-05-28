import styled from 'styled-components'
import { FileDetails, FileList } from '@app/components/contribute'

const Container = styled.div`
  margin: 4rem 0 0 11.5rem;
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
