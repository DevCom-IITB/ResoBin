import styled from 'styled-components/macro'

const TimeTableLectureItem = ({ title, track, row }) => {
  return (
    <GridItem row={row} track={track}>
      <Container id={track.id}>
        <h3>{title}</h3>
        <span>
          {row.start.title} - {row.end.title}
        </span>
      </Container>
    </GridItem>
  )
}

export default TimeTableLectureItem

const colors = (num) => {
  switch (num) {
    case '1':
      return 'linear-gradient(to right, #00b09b, #96c93d)'
    case '2':
      return 'linear-gradient(to right, #000428, #004e92)'
    case '3':
      return 'linear-gradient(to right, #cb356b, #bd3f32)'
    case '4':
      return 'linear-gradient(to right, #f2994a, #f2c94c)'
    case '5':
      return 'linear-gradient(to right, #36d1dc, #5b86e5)'
    case '6':
      return 'linear-gradient(to right, #834d9b, #d04ed6)'
    case '7':
      return 'linear-gradient(to right, #fffc00, #fffc00)'
    default:
      return 'linear-gradient(to right, #666666, #aaaaaa)'
  }
}

const GridItem = styled.div`
  grid-row: ${({ row }) => row.start.id} / ${({ row }) => row.end.id};
  grid-column: track-${({ track }) => track.id}-start;
  color: ${({ theme }) => theme.textColor};
  background: white;
`

const Container = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background: ${({ id }) => colors(id)};
  cursor: pointer;
  transition: all 200ms ease-out;

  & > h3 {
    font-size: 1rem;
  }

  & > span {
    display: block;
    font-size: 0.75rem;
  }

  &:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  }
`
