import { rgba } from 'polished'
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
    [tracks] 2rem
    ${rows.map(({ id, title }, index) => `[${id}] 1fr `)};
  grid-template-columns:
    [times] 3.5rem
    ${cols.map(({ id, title }, index) => `[${id}] 1fr `)};
  padding: 1rem;
  border-radius: 0.5rem;
  background: white;

  &::after {
    content: '';
    position: sticky;
    top: 3rem;
    z-index: 0;
    grid-row: tracks;
    grid-column: 1 / -1;
    background-color: ${rgba('white', 0.9)};
  }

  > div {
    box-shadow: inset -1px -1px 0 #eceff1;
  }
`

const ColContainer = styled.span`
  display: none;
  grid-row: tracks;
  grid-column: ${({ id }) => id};
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 700px) {
    position: sticky;
    top: 3rem;
    z-index: 20;
    display: block;
    padding: 10px 5px 5px;
  }
`

const RowContainer = styled.span`
  position: relative;
  top: -0.375rem;
  right: 0.75rem;
  display: flex;
  justify-content: flex-end;
  grid-row: ${({ id }) => id};
  grid-column: times;
  font-size: 0.5rem;
  font-family: 'Roboto', monospace;
`

const TimetableFillerItem = styled.div`
  grid-row: ${({ row }) => row.id};
  grid-column: ${({ col }) => col.id};
  min-height: 1.5rem;
`
