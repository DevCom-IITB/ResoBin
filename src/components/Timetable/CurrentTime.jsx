import styled from 'styled-components/macro'

const CurrentTime = ({
  mode = 'vertical',
  column = 'col-1',
  row = 'time-1100',
  circleDiameter = '0.5rem',
  lineThickness = '0.1rem',
}) => {
  return (
    <Container mode={mode} column={column} row={row}>
      <Circle diameter={circleDiameter} mode={mode} />
      <Line thickness={lineThickness} mode={mode} />
    </Container>
  )
}

export default CurrentTime

const Container = styled.div`
  position: relative;
  grid-row: ${({ row }) => row};
  grid-column: ${({ column }) => column};
  width: ${({ mode }) => (mode === 'vertical' ? '100%' : '0')};
  height: ${({ mode }) => (mode !== 'vertical' ? '100%' : '0')};
  background: none;

  &:hover {
    opacity: 0.2;
  }
`

const Circle = styled.div`
  position: absolute;
  top: calc(-${({ diameter }) => diameter} / 2);
  left: calc(-${({ diameter }) => diameter} / 2);
  width: calc(${({ diameter }) => diameter});
  height: calc(${({ diameter }) => diameter});
  border-radius: 50%;
  background: #44475a;
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
  background: #44475a;
`
