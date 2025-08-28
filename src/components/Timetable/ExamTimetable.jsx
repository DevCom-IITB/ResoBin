import React, { useState, useEffect, useRef } from 'react'

import { toast } from 'components/shared'
import { API } from 'config/api'
import { hash } from 'helpers'
import { useColorPicker } from 'hooks'
import { makeGradient } from 'styles/utils'

const montserratFontId = 'montserrat-font-link'
if (!document.getElementById(montserratFontId)) {
  const link = document.createElement('link')
  link.id = montserratFontId
  link.rel = 'stylesheet'
  link.href =
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap'
  document.head.appendChild(link)
}

const styles = {
  container: {
    padding: '1rem',
    fontFamily: 'Montserrat,Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#26223A ',
    borderRadius: '12px',
  },
  card: {
    backgroundColor: '#26223A ',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '700px',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    minHeight: '200px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    padding: '1rem 1.5rem',
    backgroundColor: '#26223A ',
    color: '#fff',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    border: '1px solid #39324d',
  },
  th: {
    textAlign: 'left',
    padding: '0.9rem 1.2rem',
    backgroundColor: '#26223A ',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    color: 'white',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    border: '1px solid white ',
  },
  td: {
    padding: '0.9rem 1.2rem',
    fontSize: '0.95rem',
    color: '#444',
    textAlign: 'center',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    border: '1px solid white',
    backgroundColor: 'transparent',
  },
  rowEven: {
    backgroundColor: '#23203A',
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
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  date: {
    fontSize: '0.9rem',
    color: 'white',
    fontStyle: 'italic',
    fontWeight: '500',
    padding: '0.9rem 1.2rem',
    textAlign: 'left',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    border: '1px solid white ',
  },
  courses: {
    background: 'linear-gradient(90deg, #3a3456 0%, #1B1728 100%)',
    color: 'black',
    marginTop: '1rem',
    padding: '0.9rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    border: '1px solid white ',
  },
}

const Table = ({ timetable }) => {
  const colorPicker = useColorPicker()

  const sortedDates = Object.keys(timetable).sort((a, b) => {
    const extractDate = (str) => {
      const datePart = str.split(' ')[1]
      const [day, month, year] = datePart
        .split('/')
        .map((num) => parseInt(num, 10))
      return new Date(2000 + year, month - 1, day)
    }
    return extractDate(a) - extractDate(b)
  })

  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, maxHeight: 'none', overflowY: 'visible' }}>
        <h2 style={styles.title}>📚 Mid-semester Examinations</h2>
        <p
          style={{
            color: '#ffeb3b',
            fontSize: '14px',
            textAlign: 'center',
            margin: '0.5rem 0 1rem',
            padding: '0.5rem',
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
            fontStyle: 'italic',
          }}
        >
          Exam slots are auto-generated from your ResoBin timetable using the official ASC PDF. Your
          professors might change the date of the exam. Do confirm with others!
        </p>
        <div
          style={{
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Day/Date</th>
                <th style={styles.th}>08:30 - 10:30</th>
                <th style={styles.th}>11:00 - 13:00</th>
                <th style={styles.th}>13:30 - 15:30</th>
                <th style={styles.th}>16:00 - 18:00</th>
                <th style={styles.th}>18:30 - 20:30</th>
              </tr>
            </thead>
            <tbody>
              {sortedDates.map((date, idx) => {
                const slotData = timetable[date] || {}
                const rowSlots = {
                  '08:30 - 10:30': slotData[1] || [],
                  '11:00 - 13:00': slotData[2] || [],
                  '13:30 - 15:30': slotData[3] || [],
                  '16:00 - 18:00': slotData[4] || [],
                  '18:30 - 20:30': slotData[5] || [],
                }

                return (
                  <tr
                    key={date}
                    style={{
                      ...styles.rowHover,
                      ...(idx % 2 === 1 ? styles.rowEven : {}),
                    }}
                  >
                    <td style={styles.date}>{date}</td>
                    {Object.entries(rowSlots).map(([slotLabel, courses]) => (
                      <td
                        key={slotLabel}
                        style={{
                          ...styles.td,
                          padding: courses.length ? 0 : styles.td.padding,
                          background: courses.length
                            ? 'none'
                            : styles.td.backgroundColor,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          {courses.map((courseCode) => (
                            <span
                              key={courseCode}
                              style={{
                                background: makeGradient(
                                  colorPicker(hash(courseCode))
                                ),
                                color: 'black',
                                borderRadius: '12px',
                                padding: '0.5rem 1.5rem',
                                fontWeight: 600,
                                fontFamily:
                                  'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                                margin: '0.3rem 0.3rem',
                                display: 'inline-block',
                                textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                                fontSize: '1.1rem',
                                letterSpacing: '1px',
                              }}
                            >
                              {courseCode}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const CourseFinderFilterForm = ({ setCoursesAndSlots }) => {
  const [semesters, setSemesters] = useState({})
  const getSemesters = async () => {
    try {
      const response = await API.semesters.list()
      setSemesters(response[0])
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }
  useEffect(() => {
    getSemesters()
  }, [])

  useEffect(() => {
    const fetchUserTimetable = async () => {
      try {
        if (!semesters.season || !semesters.year) {
          setCoursesAndSlots([], [])
          return
        }
        const response = await API.profile.timetable.read({
          season: semesters.season,
          year: semesters.year,
        })

        const filtered = response.filter((item) => {
          const firstSlot =
            Array.isArray(item.lectureSlots) && item.lectureSlots.length > 0
              ? item.lectureSlots[0]
              : ''

          return !(typeof firstSlot === 'string' && firstSlot.startsWith('L'))
        })

        const courses = filtered.map((item) => item.course)
        const slots = filtered.map((item) => {
          const firstSlot =
            Array.isArray(item.lectureSlots) && item.lectureSlots.length > 0
              ? item.lectureSlots[0]
              : ''

          if (!firstSlot) return 0

          const match = firstSlot.match(/^\d+/)
          if (match) {
            return parseInt(match[0], 10)
          }

          return 0
        })
        setCoursesAndSlots(courses, slots)
      } catch (error) {
        toast({
          status: 'error',
          content: 'Failed to fetch user timetable',
          key: 'timetable-error',
        })
        setCoursesAndSlots([], [])
      }
    }
    fetchUserTimetable()
  }, [semesters, setCoursesAndSlots])

  return null
}

const PopupExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [timetable, setTimetable] = useState({})

  // 👇 atomic state: array of { course_code, course_slot_number? }
  const [userCourses, setUserCourses] = useState([])
  const lastRequestRef = useRef(0)

  const setCoursesAndSlots = React.useCallback((coursesArr, slotsArr) => {
    const combined = coursesArr.map((code, idx) => {
      const slotNumber = slotsArr[idx]
      return slotNumber
        ? { course_code: code, course_slot_number: slotNumber }
        : { course_code: code }
    })
    setUserCourses(combined)
  }, [])

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!isOpen) return
    if (!userCourses.length) {
      setTimetable({})
      return
    }

    const requestId = lastRequestRef.current + 1

    const fetchSchedule = async () => {
      try {
        const res = await API.examSchedule.getBatch({ courses: userCourses })
        // if (requestId !== lastRequestRef.current) return // ignore stale responses
        const temp = {}
        const successfulSchedules = res.filter(
          (schedule) => schedule && !schedule.error
        )

        successfulSchedules.forEach((schedule) => {
          const { dayDate, mappedSlot, courseCode } = schedule
          if (!dayDate || !mappedSlot || !courseCode) return

          if (!temp[dayDate]) {
            temp[dayDate] = { 1: [], 2: [], 3: [], 4: [], 5: [] }
          }

          temp[dayDate][mappedSlot].push(courseCode)
        })

        setTimetable(temp)
      } catch (err) {
        if (requestId !== lastRequestRef.current) return
        setTimetable({})
      }
    }

    fetchSchedule()
  }, [userCourses, isOpen])

  return (
    <div className="popup">
      <button
        id="popup-btn"
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
        Mid Sem
      </button>

      {isOpen && (
        <div
          className="Popup-Window"
          style={{
            backgroundColor: '#26223A ',
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
          <Table timetable={timetable} />
          <CourseFinderFilterForm setCoursesAndSlots={setCoursesAndSlots} />
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

export default Exam
