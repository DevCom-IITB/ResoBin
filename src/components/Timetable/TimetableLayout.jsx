import { rgba } from 'polished'
import styled from 'styled-components/macro'

import { cols, rows } from 'data/timetable'

const ColHeader = ({ id, title }) => (
  <ColContainer id={id}>{title}</ColContainer>
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

const Container = styled.div`
  display: grid;
  grid-template-rows:
    [tracks] 2rem
    ${rows.map(({ id, title }, index) => `[${id}] 1fr `)};
  grid-template-columns:
    [times] 2.5rem
    ${cols.map(({ id, title }, index) => `[${id}] 1fr `)};
  padding: 0.75rem;
  margin-bottom: 1rem;
  overflow-x: scroll;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  > div {
    box-shadow: inset -1px -1px 0 ${({ theme }) => rgba(theme.primary, 0.1)};
  }
`

const ColContainer = styled.span`
  display: flex;
  grid-row: tracks;
  grid-column: ${({ id }) => id};
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  background: ${({ theme }) => theme.secondary};
`

const RowContainer = styled.span`
  position: relative;
  top: -0.4rem;
  right: 0.75rem;
  display: flex;
  grid-row: ${({ id }) => id};
  grid-column: times;
  justify-content: flex-end;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.5rem;
  font-family: Roboto, monospace;
`

const TimetableFillerItem = styled.div`
  grid-row: ${({ row }) => row.id};
  grid-column: ${({ col }) => col.id};
  min-height: 1.5rem;
`
