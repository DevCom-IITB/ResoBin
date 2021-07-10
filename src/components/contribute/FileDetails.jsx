import Divider from 'components/shared/Divider'
import styled from 'styled-components'

const Container = styled.div`
  height: 5000px;
  margin: 2rem 21rem 2rem 2rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
`

const Title = styled.span`
  padding: 2.5rem 2.5rem 1rem;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 30px;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const FileDetails = () => {
  return (
    <Container>
      <Title> Upload details </Title>
      <Divider />
    </Container>
  )
}

export default FileDetails
