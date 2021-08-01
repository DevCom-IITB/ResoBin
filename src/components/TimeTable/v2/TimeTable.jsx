import styled from 'styled-components/macro'

import './TimeTable.css'
import { tracks, rows } from './timeTableData'
import TimeTableLectureItem from './TimeTableLectureItem'

const TrackHeader = ({ id, title }) => {
  return (
    <span
      className="track-slot"
      aria-hidden="true"
      style={{ gridColumn: `track-${id}`, gridRow: 'tracks' }}
    >
      {title}
    </span>
  )
}

const RowHeader = ({ id, title }) => {
  return (
    <h2
      className="time-slot"
      style={{ gridColumn: 'times', gridRow: `time-${id}` }}
    >
      {title}
    </h2>
  )
}

const TimeTable = () => {
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
                gridRow: `time-${rows[j].id} / time-${rows[j].id}`,
                gridColumn: `track-${track.id}`,
                background: (i + j) % 2 ? '#cfcfcf' : '#e2e2e2',
                minHeight: '1.5rem',
              }}
              key={row.id}
            />
          )
        })
      )}

      <div
        className="session track-1"
        style={{ gridColumn: 'track-1', gridRow: 'time-0830 / time-0930' }}
      >
        <h3 className="title">CL 152</h3>
        <span className="time">8:30 - 9:30</span>
      </div>

      <TimeTableLectureItem
        title="EE 101"
        track={tracks[2]}
        row={{ start: rows[1], end: rows[3] }}
      />

      <TimeTableLectureItem
        title="EE 101"
        track={tracks[2]}
        row={{ start: rows[1], end: rows[3] }}
      />
    </Container>
  )
}

export default TimeTable

/* Gridlines will need to be "named" in 24hr time
  Switch '1fr' to 'auto' if height of slot shouldnt be proportional to lecture length */

const Container = styled.div`
  display: grid;
  grid-template-rows:
    [tracks] auto
    [time-0830] 1fr
    [time-0900] 1fr
    [time-0930] 1fr
    [time-1000] 1fr
    [time-1030] 1fr
    [time-1100] 1fr
    [time-1130] 1fr
    [time-1200] 1fr
    [time-1230] 1fr
    /* lunch break */
    [time-1400] 1fr
    [time-1430] 1fr
    [time-1500] 1fr
    [time-1530] 1fr
    [time-1600] 1fr
    [time-1630] 1fr
    [time-1700] 1fr
    /* evening break */
    [time-1730] 1fr
    [time-1800] 1fr
    [time-1830] 1fr
    [time-1900] 1fr
    [time-1930] 1fr
    [time-2000] 1fr
    [time-2030] 1fr;
  grid-template-columns:
    [times] 4rem
    [track-1-start] 1fr
    [track-1-end track-2-start] 1fr
    [track-2-end track-3-start] 1fr
    [track-3-end track-4-start] 1fr
    [track-4-end track-5-start] 1fr
    [track-5-end];
  grid-gap: 2px;
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
