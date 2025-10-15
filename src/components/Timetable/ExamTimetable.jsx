import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

// import { Form, toast } from 'components/shared'
import { toast } from 'components/shared'
import { API } from 'config/api'
import { hash } from 'helpers'
// import { useQueryString, useColorPicker } from 'hooks'
import { useColorPicker } from 'hooks'
import { makeGradient } from 'styles/utils'

export const filterKeys = [
  'p',
  'semester',
  'department',
  'credits_min',
  'credits_max',
  'halfsem',
  'running',
  'tags',
  'slots',
  'avoid_slots',
  'avoid_slot_clash',
]

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
    backgroundColor: '#2d2941ff ',
    borderRadius: '12px',
    JustifyContent: 'start',
    marginTop: '1.2rem',
  },
  card: {
    backgroundColor: '#342f4bff  ',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '900px',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    minHeight: '200px',
    JustifyContent: 'start',
  },
  title: {
    fontSize: '1.5rem',
    backgroundColor: '#26223A ',
    color: '#fff',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    borderRadius: '8px',
    marginRight: '31rem',
  },
  table: {
    width: '105%',
    borderCollapse: 'collapse',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    // border: '1px solid #39324d',
    JustifyContent: 'start',
  },
  th: {
    textAlign: 'left',
    padding: '0.9rem 1.2rem',
    // backgroundColor: '#342f4bff  ',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    color: 'white',
    // border: '1px solid #44405eff',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  td: {
    padding: '0.9rem 1.2rem',
    fontSize: '0.95rem',
    color: '#444',
    textAlign: 'center',
    fontFamily: 'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    border: '1px solid #44405eff',
    backgroundColor: 'transparent',
  },
  rowEven: {
    // backgroundColor: '#342f4bff ',
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
    // border: '1px solid #44405eff',
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

// Styled trigger button to match the "Add" button in Timetable (same look and layering)
const ExamButton = styled.button`
  background-color: #6d669e;
  color: #ffffff;
  border: none;
  height: 32px;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5f58a6; /* approximate darken of #6d669e without dependency */
  }
`

const Table = ({ timetable }) => {
  // console.log('Table received timetable:', timetable)
  const colorPicker = useColorPicker()

  // Group data by weekday and time slot
  const organizedData = React.useMemo(() => {
    const weekdays = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN']
    const timeSlots = [
      { label: '09:00 AM - 12:00 PM', slot: 1 },
      { label: '1:30 PM - 4:30 PM', slot: 2 },
      { label: '6:00 PM - 9:00 PM', slot: 3 },
    ]

    const organized = {}

    // Initialize structure
    timeSlots.forEach((timeSlot) => {
      organized[timeSlot.slot] = {}
      weekdays.forEach((day) => {
        organized[timeSlot.slot][day] = []
      })
    })

    // Populate with data from timetable
    Object.entries(timetable).forEach(([dateStr, slotData]) => {
      // console.log('Processing dateStr:', dateStr, 'slotData:', slotData)

      // Extract weekday from date string (e.g., "Monday, 16/09/24" or "Monday 16/09/24")
      const dayName = dateStr.split(/[, ]/)[0].toUpperCase()
      // console.log('Extracted dayName:', dayName)

      // Map day names to abbreviations
      const dayMapping = {
        MONDAY: 'MON',
        TUESDAY: 'TUES',
        WEDNESDAY: 'WED',
        THURSDAY: 'THURS',
        FRIDAY: 'FRI',
        SATURDAY: 'SAT',
        SUNDAY: 'SUN',
      }
      const mappedDay = dayMapping[dayName] || dayName
      // console.log('Mapped day from', dayName, 'to', mappedDay)

      // Extract date part (e.g., "16/09/24" -> "16\nSEPT")
      const datePart = dateStr.split(/[, ]/).slice(1).join(' ')
      // console.log('Extracted datePart:', datePart)
      const [day, month] = datePart.split('/')
      const monthNames = [
        '',
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEPT',
        'OCT',
        'NOV',
        'DEC',
      ]
      const monthAbbr = monthNames[parseInt(month, 10)] || month

      Object.entries(slotData).forEach(([slotNum, courses]) => {
        const slot = parseInt(slotNum, 10)
        if (organized[slot] && organized[slot][mappedDay]) {
          courses.forEach((courseCode) => {
            organized[slot][mappedDay].push({
              courseCode,
              date: day,
              month: monthAbbr,
            })
          })
          // console.log(`Successfully added courses to slot ${slot}, day ${mappedDay}`)
        }
      })
    })

    // console.log('Final organized data:', organized)
    // console.log('Number of courses in organized data:',
    //   Object.values(organized).reduce((total, slots) =>
    //     total + Object.values(slots).reduce((slotTotal, courses) => slotTotal + courses.length, 0), 0))

    return { organized, timeSlots, weekdays }
  }, [timetable])

  const { organized, timeSlots, weekdays } = organizedData

  return (
    <div style={styles.container}>
      <div
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
        }}
      >
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: '120px' }}> </th>
              {weekdays.map((day) => (
                <th key={day} style={styles.th}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, idx) => (
              <tr
                key={timeSlot.slot}
                style={{
                  ...styles.rowHover,
                  ...(idx % 2 === 1 ? styles.rowEven : {}),
                }}
              >
                <td
                  style={{
                    ...styles.date,
                    textAlign: 'center',
                    // verticalAlign: 'middle'
                  }}
                >
                  {timeSlot.label}
                </td>
                {weekdays.map((day) => {
                  const courses = organized[timeSlot.slot][day] || []
                  return (
                    <td
                      key={day}
                      style={{
                        ...styles.td,
                        padding: courses.length ? '0.5rem' : styles.td.padding,
                        background: courses.length
                          ? 'none'
                          : styles.td.backgroundColor,
                        verticalAlign: 'top',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          minHeight: '60px',
                        }}
                      >
                        {courses.map((course) => (
                          <div
                            key={`${course.courseCode}-${course.date}-${course.month}`}
                            style={{
                              background: makeGradient(
                                colorPicker(hash(course.courseCode))
                              ),
                              color: 'black',
                              borderRadius: '8px',
                              padding: '0',
                              fontWeight: 450,
                              fontFamily:
                                'Montserrat, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'stretch', // <-- important
                              textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                              fontSize: '0.9rem',
                              letterSpacing: '0.5px',
                              overflow: 'hidden', // <-- to merge rounded corners cleanly
                            }}
                          >
                            {/* Left beige date column */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                background: 'rgb(255, 233, 204)',
                                padding: '0.3rem 0.5rem',
                                width: '45px',
                                marginLeft: '0.2rem',
                                textAlign: 'center',
                                borderTopLeftRadius: '8px',
                                borderBottomLeftRadius: '8px',
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '1rem',
                                  marginBottom: '2px',
                                }}
                              >
                                {course.date}
                              </div>
                              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                                {course.month}
                              </div>
                            </div>

                            {/* Right course code */}
                            <div
                              style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                                padding: '0.5rem 0.8rem',
                              }}
                            >
                              {course.courseCode}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const CourseFinderFilterForm = ({ setCoursesAndSlots }) => {
  // const { deleteQueryString, getQueryString, setQueryString } = useQueryString()
  // const [form] = Form.useForm()
  // const [userTimetableCourses, setUserTimetableCourses] = useState([])
  const [semesters, setSemesters] = useState({})
  const getSemesters = async () => {
    try {
      const response = await API.semesters.list()
      setSemesters(response[0])
      // console.log('Fetched timetable slots: here', response)
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
          // setUserTimetableCourses([])
          setCoursesAndSlots([], [])
          return
        }
        const response = await API.profile.timetable.read({
          season: semesters.season,
          year: semesters.year,
        })
        // setUserTimetableCourses(response)
        // console.log('User Timetable Courses:', response);

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

          // Extract all leading digits before any letter
          const match = firstSlot.match(/^\d+/)
          if (match) {
            return parseInt(match[0], 10)
          }

          return 0
        })
        // console.log('Courses:', courses)
        // console.log('All Lecture Slots:', slots)
        setCoursesAndSlots(courses, slots)
      } catch (error) {
        toast({
          status: 'error',
          content: 'Failed to fetch user timetable',
          key: 'timetable-error',
        })
        // setUserTimetableCourses([])
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
  const [courses, setCourses] = useState([])
  const [slots, setSlots] = useState([])

  const setCoursesAndSlots = React.useCallback((coursesArr, slotsArr) => {
    setCourses(coursesArr)
    setSlots(slotsArr)
  }, [])

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!isOpen) return () => {} // Return empty cleanup function
    if (!courses.length) {
      setTimetable({})
      return () => {} // Return empty cleanup function
    }

    // Add a small delay to prevent rapid successive calls
    const timeoutId = setTimeout(() => {
      const fetchSchedule = async () => {
        const userCourses = courses.map((code, idx) => {
          const slotNumber = slots[idx]
          return slotNumber
            ? { course_code: code, course_slot_number: slotNumber }
            : { course_code: code }
        })

        try {
          const res = await API.examSchedule.getBatch({ courses: userCourses })
          const temp = {}
          res.filter(Boolean).forEach((schedule) => {
            const { dayDate, mappedSlot, courseCode } = schedule

            if (!dayDate || !mappedSlot || !courseCode) return

            if (!temp[dayDate]) {
              temp[dayDate] = { 1: [], 2: [], 3: [] }
            }

            temp[dayDate][mappedSlot].push(courseCode)
          })

          setTimetable(temp)
        } catch (err) {
          // console.error('Failed to fetch schedule:', err)
          if (err.response?.status === 429) {
            // console.log('Rate limited - will retry after 2 seconds')
            // Retry after 2 seconds if rate limited
            setTimeout(fetchSchedule, 2000)
          } else {
            setTimetable({})
          }
        }
      }

      fetchSchedule()
    }, 300) // 300ms delay to debounce rapid calls

    return () => clearTimeout(timeoutId)
  }, [courses, slots, isOpen])

  return (
    <div className="popup">
      <ExamButton type="button" onClick={togglePopup}>
        End Sem
      </ExamButton>

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
              ...styles.title,
              marginRight: '42rem',
              marginBottom: '0.5rem',
              fontWeight: '520',
            }}
          >
            {' '}
            Exam Timetable
          </h2>
          <h2 style={{ ...styles.title }}>
            {' '}
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="auto" height="auto" fill="#2c2a3a" />

              <g
                fill="none"
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g strokeWidth="1.5">
                  <rect x="3.5" y="6.5" width="17" height="17" rx="2.5" />
                  <line x1="3.5" y1="18.5" x2="20.5" y2="18.5" />
                </g>
              </g>
            </svg>
            {'  '}End-semester Examinations
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
