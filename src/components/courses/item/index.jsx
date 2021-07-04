import LeftSection from 'components/courses/item/LeftSection'
import RightSection from 'components/courses/item/RightSection'
import styled from 'styled-components'

const Container = styled.div`
  /* display: flex; */
  width: 100%;
  padding: 1.5rem 1rem;

  margin: 1rem 0;
  background: ${({ theme }) => theme.darksecondary};
  border-radius: 8px;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.4);
`

const CourseItem = ({ ...props }) => {
  return (
    <Container>
      <LeftSection {...props} />
      <RightSection {...props} />
    </Container>
  )
}

export default CourseItem
