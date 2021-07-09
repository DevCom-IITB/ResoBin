import { ButtonSquare } from 'components/shared'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  min-width: 11.5rem;
  text-align: center;
`

const Group = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 5%;
`

const Pil = styled.h1`
  display: flex;
  opacity: ${({ active }) => (active ? '100%' : '20%')};
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 1.5rem;
  margin: 0;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.darksecondary};
`

const Title = styled.h1`
  margin: 0.75rem 0 0.5rem;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 20px;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const Autumn = { backgroundColor: '#fec400' }

const Spring = { backgroundColor: '#29cc97' }

const buttonStyle = {
  fontSize: '0.75rem',
  width: '100%',
  height: '1.5rem',
}

const CourseItem = ({ data }) => {
  return (
    <Container>
      <Title>Semester</Title>
      <Group>
        <Pil active={data.Semester.includes('Autumn')} style={Autumn}>
          Autumn
        </Pil>
        <Pil active={data.Semester.includes('Spring')} style={Spring}>
          Spring
        </Pil>
      </Group>

      <Title>Study material</Title>
      <Group>
        <ButtonSquare type="button" style={buttonStyle}>
          Textbook
        </ButtonSquare>
        <ButtonSquare type="button" style={buttonStyle}>
          Notes
        </ButtonSquare>
        <ButtonSquare type="button" style={buttonStyle}>
          Papers
        </ButtonSquare>
      </Group>
    </Container>
  )
}

export default CourseItem
