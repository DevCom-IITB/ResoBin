import styled from 'styled-components'
import Divider from 'components/shared/Divider'

const Container = styled.div`
  background: ${({ theme }) => theme.darksecondary};
  margin: 1rem 2rem 2rem;
  height: 1500px; /* Test height */
  border-radius: 8px;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.4);
`

const Title = styled.h4`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 30px;
  letter-spacing: 1.5px;
  padding: 2.5rem 2.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
`

const CourseList = () => {
  return (
    <Container>
      <Title> Courses </Title>
      <Divider />
    </Container>
  )
}

export default CourseList
