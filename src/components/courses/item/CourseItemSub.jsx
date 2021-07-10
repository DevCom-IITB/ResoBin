import { ButtonSquare } from 'components/shared'
import { device, deviceRange } from 'helpers/mediaQueries'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: block;
  min-width: 10rem;
  text-align: center;
`

const Title = styled.span`
  display: block;
  margin: 0 0 0.5rem;
  font-weight: 400;
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const GroupBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0.75rem;
  gap: 5%;
`

const SemesterGroup = styled.div`
  ${GroupBase}
`

const OptionsGroup = styled.div`
  ${GroupBase}

  @media ${deviceRange.sm2md}, ${device.lg} {
    flex-direction: column;
    justify-content: space-between;
    height: 6.5rem;
  }
`

const Pil = styled.span`
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

const Autumn = { backgroundColor: '#fec400' }

const Spring = { backgroundColor: '#29cc97' }

const buttonStyle = {
  fontSize: '0.75rem',
  width: '100%',
  height: '1.5rem',
}

const CourseItemSub = ({ data }) => {
  return (
    <Container>
      <Title>Semester</Title>
      <SemesterGroup>
        <Pil active={data.Semester.includes('Autumn')} style={Autumn}>
          Autumn
        </Pil>

        <Pil active={data.Semester.includes('Spring')} style={Spring}>
          Spring
        </Pil>
      </SemesterGroup>

      <Title>Study material</Title>
      <OptionsGroup>
        <ButtonSquare type="button" style={buttonStyle}>
          Textbook
        </ButtonSquare>

        <ButtonSquare type="button" style={buttonStyle}>
          Notes
        </ButtonSquare>

        <ButtonSquare type="button" style={buttonStyle}>
          Papers
        </ButtonSquare>
      </OptionsGroup>
    </Container>
  )
}

export default CourseItemSub
