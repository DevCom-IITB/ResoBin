import styled from 'styled-components/macro'

const CurrentTime = ({
  mode = 'vertical',
  circleDiameter = '0.5rem',
  lineThickness = '0.1rem',
}) => {
  const date = new Date()
  const mins = String(30 * Math.floor(date.getMinutes() / 30))
  const hours = String(date.getHours())
  const day = date.getDay()
  const time = `${hours.padStart(2, '0')}${mins.padStart(2, '0')}`

  const isVisible = time > '0830' && time < '2100' && day > 1 && day < 7

  return (
    isVisible && (
      <Container mode={mode} column={`col-${day}`} row={`time-${time}`}>
        <Circle diameter={circleDiameter} mode={mode} />
        <Line thickness={lineThickness} mode={mode} />
      </Container>
    )
  )
}

export default CurrentTime

const Container = styled.div`
  position: relative;
  grid-row: ${({ row }) => row};
  grid-column: ${({ column }) => column};
  width: ${({ mode }) => (mode === 'vertical' ? '100%' : '0')};
  height: ${({ mode }) => (mode !== 'vertical' ? '100%' : '0')};

  &:hover {
    opacity: 0.2;
  }
`

const Circle = styled.div`
  position: absolute;
  top: calc(-${({ diameter }) => diameter} / 2);
  left: calc(-${({ diameter }) => diameter} / 2);
  width: calc(${({ diameter }) => diameter });
  height: calc(${({ diameter }) => diameter });
  border-radius: 50%;
  background: ${({ theme }) => theme.logo};
`

const Line = styled.div`
  position: absolute;
  top: calc(
    -${({ mode, thickness }) => (mode === 'vertical' ? thickness : 0)} / 2
  );
  left: calc(
    -${({ mode, thickness }) => (mode !== 'vertical' ? thickness : 0)} / 2
  );
  width: ${({ mode, thickness }) => (mode !== 'vertical' ? thickness : '100%')};
  height: ${({ mode, thickness }) =>
    mode === 'vertical' ? thickness : '100%'};
  background: ${({ theme }) => theme.logo};
`
