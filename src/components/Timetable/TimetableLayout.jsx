import styled from 'styled-components/macro'

import { cols, rows } from 'data/timetable'

const ColHeader = ({ id, title }) => (
  <TrackContainer aria-hidden="true" id={id}>
    {title}
  </TrackContainer>
)

const RowHeader = ({ id, title }) => (
  <RowContainer id={id}>{title}</RowContainer>
)

const TimetableLayout = ({ children }) => {
  return (
    <Container>
      {cols.map(({ id, title }, index) => (
        <ColHeader key={id} id={id} title={title} />
      ))}

      {rows.map(({ id, title }, index) => (
        <RowHeader key={id} id={id} title={title} />
      ))}

      {cols.map((col, i) =>
        rows.map((row, j) => (
          <TimetableFillerItem key={row.id} row={row} col={col} j={j} />
        ))
      )}

      {children}
    </Container>
  )
}

export default TimetableLayout

// * grid data is loaded from timetableData.jsx
// * switch '1fr' to 'auto' if height of slot shouldnt be proportional to lecture length

const Container = styled.div`
  display: grid;
  grid-template-rows:
    [tracks] auto
    ${rows.map(({ id, title }, index) => `[${id}] 1fr `)};
  grid-template-columns:
    [times] 4rem
    ${cols.map(({ id, title }, index) => `[${id}] 1fr `)};
  grid-column-gap: 2px;
  background: white;

  &::after {
    content: '';
    position: sticky;
    top: 3rem;
    z-index: 999;
    display: block;
    grid-row: tracks;
    grid-column: track-1 / -1;
    background-color: rgba(255, 255, 255, 0.9);
  }
`

const TrackContainer = styled.span`
  display: none;
  grid-row: tracks;
  grid-column: ${({ id }) => id};
  font-size: 0.75em;
  font-weight: bold;

  @media screen and (min-width: 700px) {
    position: sticky;
    top: 3rem;
    z-index: 1000;
    display: block;
    padding: 10px 5px 5px;
  }
`

const RowContainer = styled.span`
  grid-row: ${({ id }) => id};
  grid-column: times;
  margin: 0;
  font-size: 1rem;
  font-size: 0.75em;
  font-weight: bold;
`

const TimetableFillerItem = styled.div`
  grid-row: ${({ row }) => row.id};
  grid-column: ${({ col }) => col.id};
  min-height: 1.5rem;
  background: ${({ j }) => (j % 2 ? '#cfcfcf' : '#e2e2e2')};
`
