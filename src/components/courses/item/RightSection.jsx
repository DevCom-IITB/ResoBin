import { ButtonSquare } from 'components/shared'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  min-width: 11.5rem;
  text-align: center;
`

const Semester = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Pil = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;

  width: 4.25rem;
  height: 1.5rem;
  border-radius: 100px;
  color: ${({ theme }) => theme.darksecondary};
  opacity: ${({ active }) => (active ? '100%' : '20%')};
`

const Title = styled.h1`
  margin: 2.75rem 0 1.5rem;
  font-weight: 400;
  font-size: 1rem;
  line-height: 20px;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const Autumn = { backgroundColor: '#FEC400' }

const Spring = { backgroundColor: '#29cc97' }

const buttonStyle = {
  fontSize: '0.75rem',
  width: '9rem',
  height: '1.75rem',
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
