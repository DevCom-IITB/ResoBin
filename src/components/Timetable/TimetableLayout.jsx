import styled from 'styled-components/macro'

import { cols, rows } from './timetableData'

const ColHeader = ({ id, title }) => (
  <TrackContainer aria-hidden="true" id={id}>
    {title}
  </TrackContainer>
)

const RowHeader = ({ id, title }) => (
  <RowContainer id={id}>{title}</RowContainer>
)

const TimetableLayout = () => {
  return (
    <>
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
    </>
  )
}

export default TimetableLayout

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
