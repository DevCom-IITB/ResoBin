import styled from 'styled-components/macro'

import './TimeTable.css'

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

const LectureItem = ({ track, rows, children }) => {
  return (
    <div
      className="session session-1 track-1"
      style={{ gridColumn: 'track-1', gridRow: 'time-0830 / time-0930' }}
    >
      {children}
    </div>
  )
}

const tracks = [
  { id: '1', title: 'Monday' },
  { id: '2', title: 'Tuesday' },
  { id: '3', title: 'Wednesday' },
  { id: '4', title: 'Thursday' },
  { id: '5', title: 'Friday' },
]

const rows = [
  { id: '0830', title: '08:30 am' },
  { id: '0900', title: '09:00 am' },
  { id: '0930', title: '09:30 am' },
  { id: '1000', title: '10:00 am' },
  { id: '1030', title: '10:30 am' },
  { id: '1100', title: '11:00 am' },
  { id: '1130', title: '11:30 am' },
  { id: '1200', title: '12:00 pm' },
  { id: '1230', title: '12:30 pm' },
  { id: '1400', title: '14:00 pm' },
  { id: '1430', title: '14:30 pm' },
  { id: '1500', title: '15:00 pm' },
  { id: '1530', title: '15:30 pm' },
  { id: '1600', title: '16:00 pm' },
  { id: '1630', title: '16:30 pm' },
  { id: '1700', title: '17:00 pm' },
  { id: '1730', title: '17:30 pm' },
  { id: '1800', title: '18:00 pm' },
  { id: '1830', title: '18:30 pm' },
  { id: '1900', title: '19:00 pm' },
  { id: '1930', title: '19:30 pm' },
  { id: '2000', title: '20:00 pm' },
  { id: '2030', title: '20:30 pm' },
]

const TimeTable = () => {
  return (
    <Container>
      {tracks.map(({ id, title }, index) => (
        <TrackHeader id={id} title={title} />
      ))}

      {rows.map(({ id, title }, index) => (
        <RowHeader id={id} title={title} />
      ))}

      {rows.map((time, i) => {
        const track = 1
        return (
          <div
            className={`session track-${track}`}
            style={{
              gridColumn: 'track-1',
              gridRow: `time-${rows[i]} / time-${rows[i + 1]}`,
            }}
            key={time}
          />
        )
      })}

      <div
        className="session track-1"
        style={{ gridColumn: 'track-1', gridRow: 'time-0830 / time-0930' }}
      >
        <h3 className="title">Talk Title</h3>
        <span className="time">8:30 - 9:30</span>
      </div>

      {/* <div
        className="session session-1 track-1"
        style={{ gridColumn: 'track-1', gridRow: 'time-0830 / time-0930' }}
      >
        <h3 className="title">Talk Title</h3>
        <span className="time">8:30 - 9:30</span>
        <span className="track">Track: 1</span>
        <span className="author">Mike Rofone</span>
      </div>

      <div
        className="session session-2 track-2"
        style={{
          gridColumn: 'track-2-start',
          gridRow: 'time-0830 / time-0900',
        }}
      >
        <h3 className="title">Talk Title</h3>
        <span className="time">8:30 - 9:30</span>
        <span className="track">Track: 2</span>
        <span className="author">Mike Rofone</span>
      </div>
      <div
        className="session session-3 track-3"
        style={{
          gridColumn: 'track-3-start',
          gridRow: 'time-0830 / time-0900',
        }}
      >
        <h3 className="title">Talk Title</h3>
        <span className="time">8:30 - 9:00</span>
        <span className="track">Track: 3</span>
        <span className="author">Mike Rofone</span>
      </div>
      <div
        className="session session-4 track-4"
        style={{
          gridColumn: 'track-4-start',
          gridRow: 'time-0830 / time-1000',
        }}
      >
        <h3 className="title">Talk Title</h3>
        <span className="time">8:30 - 10:00</span>
        <span className="track">Track: 2</span>
        <span className="author">Mike Rofone</span>
      </div>

      <div
        className="session session-5 track-3"
        style={{
          gridColumn: 'track-3-start',
          gridRow: 'time-0830 / time-1000',
        }}
      >
        <h3 className="title">Talk Title</h3>
        <span className="time">8:30 - 10:00</span>
        <span className="track">Track: 1</span>
        <span className="author">Mike Rofone</span>
      </div> */}

      {/* <h2 class="time-slot" style="grid-column: times; grid-row: time-0900;">
				9:00am
			</h2>

			<div
				class="session session-6 track-1"
				style="grid-column: track-1-start / track-2-end; grid-row: time-0900 / time-1000;"
			>
				<h3 class="title">Talk Title</h3>
				<span class="time">9:00 - 10:00</span>
				<span class="track">Track: 1</span>
				<span class="author">Mike Rofone</span>
			</div>

			<h2 class="time-slot" style="grid-column: times; grid-row: time-1000;">
				10:00am
			</h2>

			<div
				class="session session-7 track-many"
				style="grid-column: track-1-start / track-4-end; grid-row: time-1000 / time-1030;"
			>
				<h3 class="title">Take a break!</h3>
			</div>

			<h2 class="time-slot" style="grid-column: times; grid-row: time-1030;">
				10:30am
			</h2>

			<div
				class="session session-8 track-1"
				style="grid-column: track-1-start; grid-row: time-1030 / time-1130;"
			>
				<h3 class="title">Talk Title</h3>
				<span class="time">10:30 - 11:30</span>
				<span class="track">Track: 1</span>
				<span class="author">Mike Rofone</span>
			</div>

			<div
				class="session session-9 track-2"
				style="grid-column: track-2-start; grid-row: time-1030 / time-1230;"
			>
				<h3 class="title">Talk Title</h3>
				<span class="time">10:30 - 12:30</span>
				<span class="track">Track: 2</span>
				<span class="author">Mike Rofone</span>
			</div>

			<div
				class="session session-10 track-4"
				style="grid-column: track-4-start; grid-row: time-1030 / time-1100;"
			>
				<h3 class="title">Talk Title</h3>
				<span class="time">10:30 - 11:0</span>
				<span class="track">Track: 4</span>
				<span class="author">Mike Rofone</span>
			</div>

			<h2 class="time-slot" style="grid-column: times; grid-row: time-1100;">
				11:00am
			</h2>

			<div
				class="session session-11 track-3"
				style="grid-column: track-3-start; grid-row: time-1100 / time-1130;"
			>
				<h3 class="title">Talk Title</h3>
				<span class="time">11:00 - 11:30</span>
				<span class="track">Track: 3</span>
				<span class="author">Mike Rofone</span>
			</div>

			<h2 class="time-slot" style="grid-column: times; grid-row: time-1130;">
				11:30am
			</h2>

			<div
				class="session track-1 track-many"
				style="grid-column: track-1-start; grid-row: time-1130 / time-1230;"
			>
				<h3 class="title">Lunch!</h3>
			</div>

			<div
				class="session track-3 track-4 track-many"
				style="grid-column: track-3-start / track-4-end; grid-row: time-1130 / time-1230;"
			>
				<h3 class="title">Lunch!</h3>
			</div> */}
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
    [times] 3rem
    [track-1-start] 1fr
    [track-1-end track-2-start] 1fr
    [track-2-end track-3-start] 1fr
    [track-3-end track-4-start] 1fr
    [track-4-end track-5-start] 1fr
    [track-5-end];
  grid-gap: 0.25rem;
  background: #d7d7d7;

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
