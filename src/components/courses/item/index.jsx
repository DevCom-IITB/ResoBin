import LeftSection from 'components/courses/item/LeftSection'
import styled from 'styled-components'
// import RightSection from 'components/courses/item/RightSection'

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0.75rem;
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
