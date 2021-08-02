import { tracks, rows } from './timetableData'
import { TrackHeader, RowHeader } from './TimetableHeaders'

const TimetableLayout = () => {
  return (
    <>
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
    </>
  )
}

export default TimetableLayout
