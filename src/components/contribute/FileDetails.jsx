import styled from 'styled-components'
import Divider from '@app/components/shared/Divider'

const Container = styled.div`
  background: ${({ theme }) => theme.darksecondary};
  margin: 6rem 21rem 2rem 2rem;
  height: 500px;
  border-radius: 8px;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.5);
`

const Title = styled.h4`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 30px;
  letter-spacing: 1.5px;
  padding: 2.5rem 2.5rem 1rem;
  color: #fff;
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
