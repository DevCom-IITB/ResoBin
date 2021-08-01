import styled from 'styled-components/macro'

import { tracks, rows } from './timetableData'
import { TrackHeader, RowHeader } from './TimetableHeaders'
import TimetableSelectedCourses from './TimetableSelectedCourses'

const TimetableContainer = () => {
  return (
    <Container>
      {tracks.map(({ id, title }, index) => (
        <TrackHeader key={id} id={id} title={title} />
      ))}

      {rows.map(({ id, title }, index) => (
        <RowHeader key={id} id={id} title={title} />
      ))}

      {tracks.map((track, i) =>
        rows.map((row, j) => {
          return (
            <div
              style={{
                gridRow: `${rows[j].id} / ${rows[j].id}`,
                gridColumn: `track-${track.id}`,
                background: j % 2 ? '#cfcfcf' : '#e2e2e2',
                minHeight: '1.5rem',
              }}
              key={row.id}
            />
          )
        })
      )}

      <TimetableSelectedCourses />
    </Container>
  )
}

export default TimetableContainer

/* Gridlines will need to be "named" in 24hr time
  Switch '1fr' to 'auto' if height of slot shouldnt be proportional to lecture length */

const Container = styled.div`
  display: grid;
  grid-template-rows:
    [tracks] auto
    ${rows.map(({ id, title }, index) => `[${id}] 1fr `)};
  grid-template-columns:
    [times] 4rem
    [track-1-start] 1fr
    [track-1-end track-2-start] 1fr
    [track-2-end track-3-start] 1fr
    [track-3-end track-4-start] 1fr
    [track-4-end track-5-start] 1fr
    [track-5-end];
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
