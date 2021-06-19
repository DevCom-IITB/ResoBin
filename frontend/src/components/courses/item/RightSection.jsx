import styled from 'styled-components'
import { ButtonSquare } from 'components/shared'

const Container = styled.div`
  width: 20%;
  text-align: center;
  /* background: gray; */
`

const Semester = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Pil = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 5.25rem;
  height: 2rem;
  border-radius: 100px;
  color: white;
  opacity: ${({ active }) => (active ? '100%' : '20%')};
`

const Title = styled.h1`
  margin: 2.75rem 0 1.5rem;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 20px;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const Autumn = { backgroundColor: '#FEC400' }
const Spring = { backgroundColor: '#29cc97' }
const buttonStyle = {
  fontSize: '1rem',
  width: '100%',
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
      <Title>Study material</Title>

      <ButtonSquare type="button" style={buttonStyle}>
        Textbook
      </ButtonSquare>
      <ButtonSquare type="button" style={buttonStyle}>
        Notes
      </ButtonSquare>
      <ButtonSquare type="button" style={buttonStyle}>
        Question Papers
      </ButtonSquare>
    </Container>
  )
}

export default CourseItem
