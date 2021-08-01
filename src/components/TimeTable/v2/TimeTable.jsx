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

const TimeTable = () => {
  return (
    <div className="schedule">
      <TrackHeader id="1" title="Monday" />
      <TrackHeader id="2" title="Tuesday" />
      <TrackHeader id="3" title="Wednesday" />
      <TrackHeader id="4" title="Thursday" />
      <TrackHeader id="5" title="Friday" />

      <RowHeader id="0830" title="8:30am" />
      <RowHeader id="0900" title="9:00am" />
      <RowHeader id="0930" title="9:30am" />
      <RowHeader id="1000" title="10:00am" />
      <RowHeader id="1030" title="10:30am" />
      <RowHeader id="1100" title="11:00am" />
      <RowHeader id="1130" title="11:30am" />
      <RowHeader id="1200" title="12:00am" />
      <RowHeader id="1230" title="12:30am" />

      <div
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
      </div>
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
    </div>
  )
}

export default TimeTable
