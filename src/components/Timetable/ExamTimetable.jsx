import { red } from '@material-ui/core/colors'
import { borderColor, borderRadius, borderWidth } from 'polished'
import React, { useState } from 'react'
import { BackgroundColor } from 'styled-icons/foundation'

const styles = {
  container: {
    padding: '1rem',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#707AFF',
    borderRadius: '12px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '0.9rem 1.5rem',
    backgroundColor: '#f0f0f0',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    color: '#555',
  },
  td: {
    padding: '0.9rem 1.5rem',
    fontSize: '0.95rem',
    color: '#444',
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
  },
  rowHover: {
    transition: 'background-color 0.2s ease-in-out',
  },
  closeButton: {
    backgroundColor: '#FF4C4C',
    color: 'white',
    marginTop: '1rem',
    padding: '5px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
}

const Table = () => {
  const data = [
    { Date: '21/4/25', Time: '11:00 AM', Subject: 'PH110' },
    { Date: '22/4/25', Time: '11:00 AM', Subject: 'MA105' },
    { Date: '26/4/25', Time: '1:00 PM', Subject: 'MM105' },
    { Date: '27/4/25', Time: '11:00 AM', Subject: 'CS101' },
    { Date: '28/4/25', Time: '11:00 AM', Subject: 'CS102' },
    { Date: '29/4/25', Time: '1:00 PM', Subject: 'CS103' },
    { Date: '30/4/25', Time: '11:00 AM', Subject: 'CS104' },
    { Date: '1/5/25', Time: '11:00 AM', Subject: 'CS105' },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📚 Mid-semester Examinations</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Subject</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable tbody container */}
        <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
          <table style={{ ...styles.table }}>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={row.Date + row.Subject}
                  style={{
                    ...styles.rowHover,
                    ...(idx % 2 === 1 ? styles.rowEven : {}),
                  }}
                >
                  <td style={styles.td}>{row.Date}</td>
                  <td style={styles.td}>{row.Time}</td>
                  <td style={styles.td}>{row.Subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const PopupExample = () => {
  const [isOpen, setIsOpen] = useState(false);


  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="popup">
      <button
        id = "popup-btn"
        className="popup-button"
        type="button"
        onClick={togglePopup}
        style={{
          backgroundColor: '#2563EB',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        {' '}
        Mid Sem
      </button>

      {isOpen && (
        <div
          className="Popup-Window"
          style={{
            backgroundColor: '#1B1728',
            padding: '20px',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          <h2
            style={{
              marginBottom: '10px',
              fontFamily: 'monospace',
              fontSize: '1.5rem',
              textDecoration: 'underline',
            }}
          >
            EXAM TIMETABLE
          </h2>
          <Table />
          <button
            className="Close-button"
            type="button"
            onClick={togglePopup}
            style={styles.closeButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}



export const Exam = () => {
  return (
    <div className="Exam">
      <PopupExample />
    </div>
  )
}

const ExamTimetable = () => {
  return <div>Exam Timetable Component</div>
}

export default ExamTimetable
