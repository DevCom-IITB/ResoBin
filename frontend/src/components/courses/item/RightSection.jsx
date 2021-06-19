import styled from 'styled-components'

const Container = styled.div`
  width: 20%;
  /* padding: 2.5rem 2.5rem 1rem; */
  background: gray;
`

const Semester = styled.div`
  width: 100%;
  padding: 2.5rem 2.5rem 1rem;
`

const CourseItem = ({ data }) => {
  return (
    <Container>
      <Semester />
      {data.Semester}
    </Container>
  )
}

export default CourseItem
