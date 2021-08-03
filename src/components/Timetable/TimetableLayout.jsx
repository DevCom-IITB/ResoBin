import styled from 'styled-components/macro'

import { cols, rows } from 'data/timetable'

const ColHeader = ({ id, title }) => (
  <ColContainer aria-hidden="true" id={id}>
    {title}
  </ColContainer>
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

      {rows.map(({ id, title }, index) =>
        index % 2 ? <RowHeader key={id} id={id} title={title} /> : null
      )}

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
  padding: 1rem;
  border-radius: 0.5rem;
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

  > div {
    box-shadow: inset -1px -1px 0 #eceff1;
  }
`

const ColContainer = styled.span`
  display: none;
  grid-row: tracks;
  grid-column: ${({ id }) => id};
  font-size: 0.75em;
  text-align: center;

  @media screen and (min-width: 700px) {
    position: sticky;
    top: 3rem;
    z-index: 20;
    display: block;
    padding: 10px 5px 5px;
    background: white;
  }
`

const RowContainer = styled.span`
  position: relative;
  top: -0.375rem;
  right: 0.5rem;
  display: flex;
  justify-content: flex-end;
  grid-row: ${({ id }) => id};
  grid-column: times;
  font-size: 0.75em;
`

const TimetableFillerItem = styled.div`
  grid-row: ${({ row }) => row.id};
  grid-column: ${({ col }) => col.id};
  min-height: 1.5rem;
`
