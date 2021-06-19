import styled from 'styled-components'

const Container = styled.div`
  width: 20%;
  /* padding: 2.5rem 2.5rem 1rem; */
  /* background: gray; */
`

const Semester = styled.div`
  width: 100%;
  display: flex;
  /* padding: 2.5rem 2.5rem 1rem; */
  justify-content: space-between;
`

const Pil = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 5.25rem;
  height: 2rem;
  border-radius: 100px;
  opacity: ${({ active }) => (active ? '100%' : '20%')};
  z-index: 2;
`

const Autumn = {
  backgroundColor: '#FEC400',
}

const Spring = {
  backgroundColor: '#29cc97',
}

const CourseItem = ({ data }) => {
  return (
    <Container>
      <Semester>
        <Pil active={data.Semester.includes('Autumn')} style={Autumn}>
          Autumn
        </Pil>
        <Pil active={data.Semester.includes('Spring')} style={Spring}>
          Spring
        </Pil>
      </Semester>
    </Container>
  )
}

export default CourseItem
