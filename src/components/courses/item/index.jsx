import LeftSection from 'components/courses/item/LeftSection'
import styled from 'styled-components'
// import RightSection from 'components/courses/item/RightSection'

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0.75rem;

  margin-top: 1rem;
  background: ${({ theme }) => theme.darksecondary};
  border-radius: 8px;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.4);
`

const CourseItem = ({ ...props }) => {
  return (
    <Container>
      <LeftSection {...props} />
      {/* <RightSection {...props} /> */}
    </Container>
  )
}

export default CourseItem
