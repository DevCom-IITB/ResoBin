import { LoadingOutlined } from '@ant-design/icons'
import { ChevronLeft, ChevronRight, X, Plus, Download, Share, ExternalLink } from '@styled-icons/heroicons-outline'
import { Spin, Alert, Modal, Radio,Tooltip} from 'antd'
import axios from 'axios'
import moment from 'moment'
import { darken } from 'polished'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import {
  Aside,
  Card,
  LoaderAnimation,
  PageHeading,
  PageTitle,
  toast,
} from 'components/shared'
import { ButtonIcon, ButtonIconDanger } from 'components/shared/Buttons'
import { API } from 'config/api'
import { slots, rows } from 'data/timetable'
import { coursePageUrl, hash } from 'helpers'
import { useQueryString, useColorPicker } from 'hooks'
import { selectCourseAPILoading, selectSemesters } from 'store/courseSlice'
import { updateTimetable } from 'store/userSlice'
import { makeGradient } from 'styles'
import 'styles/CustomModal.css'

import TimetableDownloadLink from './TimetableDownloadLink'
import TimetableSearch from './TimetableSearch'
import TimetableShareButton from './TimetableShareButton'

// const WeekGrid = styled.div`
//   display: grid;
//   grid-template-columns: 80px repeat(5, 1fr);
//   min-height: 600px;
//   position: relative;

//   background-image: repeating-linear-gradient(
//     to bottom,
//     transparent,
//     transparent 29px,
//     ${({ theme }) => theme.border} 30px
//   );
// `


// Day View Component
const DayView = ({ currentDate, events, slots: slotData, rows: rowData, coursedata }) => {
  const selectedDayIndex = currentDate.weekday() === 0 ? 6 : currentDate.weekday() - 1
  const dayEvents = events.filter(event => event.dayIndex === selectedDayIndex)

  const timeSlots = Object.values(rowData).map(row => row.title)
  const ROW_HEIGHT = 30 // Height per time slot in pixels

  return (
    <DayViewContainer>
      <DayViewGrid>
        <DayTimeColumn>
{timeSlots.map((time) => (
  <TimeSlot key={time}>
    {time.endsWith(':30') ? <TimeText>{time}</TimeText> : null}
  </TimeSlot>
))}

        </DayTimeColumn>
        <DayEventColumn>
          {dayEvents.map((event) => {
            const course = coursedata[event.courseCode]
            if (!course) return null

            // Calculate position based on actual row indices - align with time slot top
            const topPosition = event.startRow * ROW_HEIGHT
            const height = (event.endRow - event.startRow) * ROW_HEIGHT

            return (
              
              <Tooltip
                title={

                  <div>
                      <div><strong>{event.courseCode} - {course.title}</strong></div>
                      <div>Slot: {event.slotName}</div>
                      <div>{event.startTime} - {event.endTime}</div>
                    </div>
                    }
                overlayStyle={{ maxWidth: 250, fontSize: '0.9rem', color: '#333' }} // Example of styling
                placement="top"
              >
              <DayEventBlock
                key={event.id}
                color={event.color}
                style={{
                  position: 'absolute',
                  top: `${topPosition}px`,
                  left: '0rem',
                  right: '0rem',
                  height: `${height}px`
                }}
              >
                <Link to={coursePageUrl(event.courseCode, course.title)} style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <EventTitle>{event.courseCode} | {event.slotName}</EventTitle>
                    <EventTime>{event.startTime} - {event.endTime}</EventTime>
                  </div>
                  <RedirectIcon>
                    <ExternalLink size="16" />
                  </RedirectIcon>
                </Link>
              </DayEventBlock>
              </Tooltip>
              
            )
          })}
        </DayEventColumn>
      </DayViewGrid>
    </DayViewContainer>
  )
}

// Week View Component  
const WeekView = ({ currentDate, events, slots: slotData, rows: rowData, coursedata }) => {
  // Change weekDays array to include all 7 days
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const startOfWeek = currentDate.clone().startOf('week') // Remove add(1, 'day') to start from Sunday
  
  // Add these two lines
  const timeSlots = Object.values(rowData).map(row => row.title)
  const ROW_HEIGHT = 30 // Height per time slot in pixels

  return (
    <TimetableWrapper>
      <TimetableScrollInner>
    <WeekViewContainer>
      <WeekHeader>
        <div /> {/* Empty cell for time column */}
        {weekDays.map((day, index) => {
          const date = startOfWeek.clone().add(index, 'days')
          return (
            <WeekDayHeader key={day}>
              <DayNumber>{date.format('D')}</DayNumber>
              <DayName>{day}</DayName>
            </WeekDayHeader>
          )
        })}
      </WeekHeader>
      {/* Update grid template columns to accommodate 7 days */}
      <WeekGrid>
        <WeekTimeColumn>
{timeSlots.map((time) => (
  <TimeSlot key={time}>
    {time.endsWith(':30') ? <TimeText>{time}</TimeText> : null}
  </TimeSlot>
))}

        </WeekTimeColumn>
        {weekDays.map((day, dayIndex) => (
          <WeekDayColumn key={day}>
            <div style={{ position: 'relative', height: '100%' }}>
              {events
                .filter(event => event.dayIndex === dayIndex)
                .map((event) => {
                  const course = coursedata[event.courseCode]
                  if (!course) return null

                  // Calculate position based on actual row indices - align with time slot top
                  const topPosition = event.startRow * ROW_HEIGHT
                  const height = (event.endRow - event.startRow) * ROW_HEIGHT

                  return (
                                  <Tooltip
                title={

                  <div>
                      <div><strong>{event.courseCode} - {course.title}</strong></div>
                      <div>Slot: {event.slotName}</div>
                      <div>{event.startTime} - {event.endTime}</div>
                    </div>
                    }
                overlayStyle={{ maxWidth: 250, fontSize: '0.9rem', color: '#333' }} // Example of styling
                placement="top"
              >
                    <WeekEventBlock
                      key={event.id}
                      color={event.color}
                      style={{
                        position: 'absolute',
                        top: `${topPosition}px`,
                        left: '0',
                        right: '0',
                        height: `${height}px`
                      }}
                    >
                      <Link to={coursePageUrl(event.courseCode, course.title)} style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <EventTitle>{event.courseCode} | {event.slotName}</EventTitle>
                          <EventTime>{event.startTime}</EventTime>
                        </div>
                        <RedirectIcon>
                          <ExternalLink size="14" />
                        </RedirectIcon>
                      </Link>
                    </WeekEventBlock>
                    </Tooltip>
                  )
                })}
            </div>
          </WeekDayColumn>
        ))}
      </WeekGrid>
    </WeekViewContainer>
    </TimetableScrollInner>
    </TimetableWrapper>
  )
}

// Month View Component
const MonthView = ({ currentDate }) => {
  // Generate calendar grid based on current date
  const startOfMonth = currentDate.clone().startOf('month')
  const endOfMonth = currentDate.clone().endOf('month')
  const startOfCalendar = startOfMonth.clone().startOf('week')
  const endOfCalendar = endOfMonth.clone().endOf('week')

  const monthGrid = []
  let week = []
  const day = startOfCalendar.clone()

  while (day.isSameOrBefore(endOfCalendar)) {
    week.push(day.clone())
    if (week.length === 7) {
      monthGrid.push(week)
      week = []
    }
    day.add(1, 'day')
  }

  return (
    <MonthViewContainer>
      <MonthHeader>
        <MonthDayHeader>SUN</MonthDayHeader>
        <MonthDayHeader>MON</MonthDayHeader>
        <MonthDayHeader>TUE</MonthDayHeader>
        <MonthDayHeader>WED</MonthDayHeader>
        <MonthDayHeader>THU</MonthDayHeader>
        <MonthDayHeader>FRI</MonthDayHeader>
        <MonthDayHeader>SAT</MonthDayHeader>
      </MonthHeader>
      <MonthGrid>
        {monthGrid.map((weekRow, weekIndex) => (
          <MonthWeekRow key={`week-${weekRow.filter(d => d).map(d => d.date()).join('-') || weekIndex}`}>
            {weekRow.map((currentDay, dayIndex) => (
              <MonthDayCell
                key={currentDay.format('YYYY-MM-DD')}
                isCurrentMonth={currentDay.month() === currentDate.month()}
              >
                <MonthDayNumber
                  isCurrentMonth={currentDay.month() === currentDate.month()}
                  isHighlighted={currentDay.isSame(moment(), 'day')}
                >
                  {currentDay.date()}
                </MonthDayNumber>
              </MonthDayCell>
            ))}
          </MonthWeekRow>
        ))}
      </MonthGrid>
    </MonthViewContainer>
  )
}

const TimetableAsideItem = ({ course, handleRemove, loading }) => {
  const { code, title, credits } = course ?? {}

  return (
    <Link to={coursePageUrl(code, title)} style={{ textDecoration: 'none' }}>
      <Card hoverable>
        <Card.Meta
          title={
            <TimetableCardTitle>
              {code}

              <ButtonIconDanger
                tooltip="Remove from timetable"
                icon={<X size="24" />}
                onClick={handleRemove}
                disabled={loading}
                extrastyle={{}}
                color="inherit"
                hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
              />
            </TimetableCardTitle>
          }
          description={
            <>
              <span>{title}</span>
              <br />
              <span>Credits: {credits}</span>
            </>
          }
        />
      </Card>
    </Link>
  )
}

const TimetableContainer = () => {
  const dispatch = useDispatch()
  const semesterList = useSelector(selectSemesters)
  const courseAPILoading = useSelector(selectCourseAPILoading)

  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [courseData, setCourseData] = useState([])
  const [coursedata, setCoursedata] = useState({})
  const [loading, setLoading] = useState(courseAPILoading)
  const [semIdx, setSemIdx] = useState(null)
  const [currentDate, setCurrentDate] = useState(moment())
  const [loadingg, setLoadingg] = useState(true)

  const { getQueryString } = useQueryString()
  let ajaxRequest = null

  const navigate = useNavigate()
  const location = useLocation()

  const getInitialView = () => {
    if (location.pathname.includes('/day')) return 'Day'
    if (location.pathname.includes('/month')) return 'Month'
    return 'Week'
  }

  const [currentView, setCurrentView] = useState(getInitialView)

  const handleViewChange = (e) => {
    const newView = e.target.value
    setCurrentView(newView)
    navigate(`/timetable/${newView.toLowerCase()}`)
  }


  // Add the fetchCourses function
  const fetchCourses = async (params) => {
    setLoadingg(true)

    try {
      if (ajaxRequest) ajaxRequest.cancel()
      ajaxRequest = axios.CancelToken.source()

      const response = await API.courses.list({
        params,
        cancelToken: ajaxRequest.token,
      })
      setCourseData(response.results)
    } catch (error) {
      if (axios.isCancel(error)) return
      toast({ status: 'error', content: error })
    }

    setLoadingg(false)
  }

  useEffect(() => {
    const filter = getQueryString()
    const params = {
      search_fields: 'code,title,description',
      q: filter.q,
    }

    fetchCourses(params)
  }, [getQueryString])

  useEffect(() => {
    if (semesterList.length) setSemIdx(semesterList.length - 1)
  }, [semesterList])

  const fetchUserTimetable = useCallback(async (_semester) => {
    try {
      setLoading(true)
      const response = await API.profile.timetable.read(_semester)
      setCourseTimetableList(response)
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (semIdx !== null) fetchUserTimetable(semesterList[semIdx])
    else setLoading(true)
  }, [fetchUserTimetable, semesterList, semIdx])

  const handleClickPrev = () => {
    if (currentView === 'Day') {
      setCurrentDate(currentDate.clone().subtract(1, 'day'))
    } else if (currentView === 'Week') {
      setCurrentDate(currentDate.clone().subtract(1, 'week'))
    } else if (currentView === 'Month') {
      setCurrentDate(currentDate.clone().subtract(1, 'month'))
    }
  }

  const handleClickNext = () => {
    if (currentView === 'Day') {
      setCurrentDate(currentDate.clone().add(1, 'day'))
    } else if (currentView === 'Week') {
      setCurrentDate(currentDate.clone().add(1, 'week'))
    } else if (currentView === 'Month') {
      setCurrentDate(currentDate.clone().add(1, 'month'))
    }
  }

  // Add this function near handleClickPrev and handleClickNext
  const handleTodayClick = () => {
    setCurrentDate(moment()); // Reset to today's date
  };

  const removeFromTimetable = (id) => () => {
    const course = coursedata[
      courseTimetableList.find((item) => item.id === id)?.course
    ]
    const courseName = course?.title ?? 'this course'
    const courseCode = course?.code ?? ''

    Modal.confirm({
      title: `Remove ${courseCode}?`,
      content: (
        <p>
          Are you sure you want to remove <strong>{courseCode} : {courseName}</strong> from your timetable?
        </p>
      ),
      okText: 'Remove',
      cancelText: 'Cancel',
      centered: true,
      className: 'custom-dark-modal',
      onOk: async () => {
        try {
          setLoading(true)
          await API.profile.timetable.remove({ id })

          setCourseTimetableList(
            courseTimetableList.filter((item) => item.id !== id)
          )
          dispatch(updateTimetable(id))
        } catch (error) {
          toast({ status: 'error', content: error })
        } finally {
          setLoading(false)
        }
      },
    })
  }

  const addToTimetable = async (code, id) => {
    if (id === -1) {
      toast({
        status: 'error',
        content: `No TimeTable Found For ${code} for current semester`,
      })
    } else {
      try {
        await API.profile.timetable.add({ id })
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        fetchUserTimetable(semesterList[semIdx])
      }
    }
  }

  const getCourseList = () => {
    const courseList = courseTimetableList.map((item) => item.course)
    return courseList
  }

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true)
        const courseList = getCourseList()
        const promises = courseList.map(async (course) => {
          const response = await API.courses.read({ code: course })
          return response
        })
        const courseDataArray = await Promise.all(promises)
        const courseDataObj = {}
        courseDataArray.forEach((course) => {
          courseDataObj[course.code] = course
        })
        setCoursedata(courseDataObj)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [courseTimetableList])

  // Helper function to convert slot data to events
  const colorPicker = useColorPicker()
  const getEventsForView = () => {
    const events = []

    courseTimetableList.forEach((item) => {
      const course = coursedata[item.course]
      if (!course) return

      item.lectureSlots.forEach((slotName) => {
        const slot = slots[slotName]
        if (slot) {
          const dayIndex = slot.col - 1 // Convert to 0-based index
          const startRow = slot.row.start
          const endRow = slot.row.end

          events.push({
            id: `${item.id}-${slotName}`,
            courseCode: item.course,
            title: course.title,
            type: 'Lecture',
            dayIndex,
            startRow,
            endRow,
            startTime: rows[startRow]?.title || '08:30',
            endTime: rows[endRow]?.title || '09:30',
            color: colorPicker(hash(item.id)),
            slotName
          })
        }
      })

      item.tutorialSlots.forEach((slotName) => {
        const slot = slots[slotName]
        if (slot) {
          const dayIndex = slot.col - 1
          const startRow = slot.row.start
          const endRow = slot.row.end

          events.push({
            id: `${item.id}-${slotName}-tut`,
            courseCode: item.course,
            title: course.title,
            type: 'Tutorial',
            dayIndex,
            startRow,
            endRow,
            startTime: rows[startRow]?.title || '08:30',
            endTime: rows[endRow]?.title || '09:30',
            color: colorPicker(hash(item.id)),
            slotName
          })
        }
      })
    })

    return events
  }

  const events = getEventsForView()

  const getCurrentDateDisplay = () => {
    if (currentView === 'Day') {
      return currentDate.format('D MMMM YYYY')
    }
    if (currentView === 'Week') {
      return currentDate.format('MMMM YYYY')
    }
    if (currentView === 'Month') {
      return currentDate.format('MMMM YYYY')
    }
    return currentDate.format('MMMM YYYY')
  }

  const getDayViewDateDisplay = (date) => {
  return `${date.format('dddd')}, ${date.format('D MMMM YYYY')}`; // e.g., "Wednesday, 6 August 2025"
}

  const getTodayEvents = () => {
    const today = moment()
    const todayDayIndex = today.weekday() === 0 ? 6 : today.weekday() - 1 // Convert Sunday=0 to Saturday=6

    return events.filter(event => {
      if (currentView === 'Day') {
        const selectedDayIndex = currentDate.weekday() === 0 ? 6 : currentDate.weekday() - 1
        return event.dayIndex === selectedDayIndex
      }
      return event.dayIndex === todayDayIndex
    })
  }

  const todayEvents = getTodayEvents()

  // Clash detection function
  const detectClashes = () => {
    const clashes = []
    const eventsByDayAndTime = {}

    // Group events by day and time slots
    events.forEach(event => {
      const key = `${event.dayIndex}-${event.startRow}-${event.endRow}`
      if (!eventsByDayAndTime[key]) {
        eventsByDayAndTime[key] = []
      }
      eventsByDayAndTime[key].push(event)
    })

    // Check for clashes (multiple events in same time slot)
    Object.entries(eventsByDayAndTime).forEach(([key, eventsInSlot]) => {
      if (eventsInSlot.length > 1) {
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        const dayIndex = parseInt(key.split('-')[0], 10)
        const startRow = parseInt(key.split('-')[1], 10)
        const endRow = parseInt(key.split('-')[2], 10)

        const dayName = dayNames[dayIndex] || 'Unknown'
        const startTime = rows[startRow]?.title || 'Unknown'
        const endTime = rows[endRow]?.title || 'Unknown'
        const courseNames = eventsInSlot.map(e => e.courseCode).join(', ')

        clashes.push(
          `Time clash on ${dayName} (${startTime} - ${endTime}): ${courseNames}`
        )
      }
    })

    return clashes
  }

  const warnings = detectClashes()

  const dayDateString = getDayViewDateDisplay(currentDate);
  return (
    <>
<PageHeading>
  <PageTitle>Timetable</PageTitle>
  <HeaderActions>
          <TimetableDownloadLink coursesInTimetable={courseTimetableList} />

          <TimetableShareButton coursesInTimetable={courseTimetableList} />

  </HeaderActions>
</PageHeading>


      <TimetableHeader>
        <EventCountDisplay>{todayEvents.length} events today</EventCountDisplay>
        <ViewSelectorContainer>
          <StyledRadioGroup onChange={handleViewChange} value={currentView}>
            <Radio.Button value="Day">Day</Radio.Button>
            <Radio.Button value="Week">Week</Radio.Button>
            <Radio.Button value="Month">Month</Radio.Button>
          </StyledRadioGroup>
          <NavigationContainer>
            <NavButton onClick={handleClickPrev}>
              <ChevronLeft size="20" />
            </NavButton>
            <CurrentDateDisplay onClick={handleTodayClick}>
              Today
            </CurrentDateDisplay>
            <NavButton onClick={handleClickNext}>
              <ChevronRight size="20" />
            </NavButton>
          </NavigationContainer>
        </ViewSelectorContainer>
      </TimetableHeader>

      <DateDisplay>{dayDateString}</DateDisplay>

      <TimetableSearch
        loading={loadingg}
        setLoading={setLoadingg}
        data={courseData}
        addToTimetable={addToTimetable}
      />

      {loading && <LoaderAnimation />}
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        {currentView === 'Day' && <DayView currentDate={currentDate} events={events} slots={slots} rows={rows} coursedata={coursedata} />}
        {currentView === 'Week' && <WeekView currentDate={currentDate} events={events} slots={slots} rows={rows} coursedata={coursedata} />}
        {currentView === 'Month' && <MonthView currentDate={currentDate} />}
      </Spin>

      <Aside title="My courses" loading={loading}>
        <CoursesListInfo>
          Total credits:{' '}
          {Object.values(coursedata).reduce(
            (acc, course) => acc + (course?.credits || 0),
            0
          )}
        </CoursesListInfo>
        <ClashAlerts>
          {!loading &&
            warnings.map((warning) => (
              <Alert
                key={warning}
                message="Warning"
                description={warning}
                type="warning"
                showIcon
                closable
              />
            ))}
        </ClashAlerts>

        <AsideList>
          {!loading &&
            courseTimetableList.map(({ id, course }) => (
              <TimetableAsideItem
                key={id}
                course={coursedata[course]}
                handleRemove={removeFromTimetable(id)}
                loading={loading}
              />
            ))}
        </AsideList>
      </Aside>
    </>
  )
}

export default TimetableContainer

// Styled Components
const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const TimetableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
`

const EventCountDisplay = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
`

const ViewSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const StyledRadioGroup = styled(Radio.Group)`
  display: inline-flex;
  border: 1px solid #a29ca6;
  border-radius: 12px;
  padding: 2px;
  background: transparent;

  .ant-radio-button-wrapper {
    background: transparent;
    color: #a29ca6;
    border: none !important;               // remove separator borders
    padding: 6px 16px;
    font-weight: 500;
    border-radius: 8px;
    margin: 0;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    // remove left border on non-first items (causes "bar" effect)
    &::before {
      display: none !important;
    }

    &:not(:last-child) {
      margin-right: 4px;
    }

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .ant-radio-button-wrapper-checked {
    background: #6d669e;
    color: #ffffff;
    font-weight: 600;
  }
`;



const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const NavButton = styled.button`
  background: #a18aff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #8c7ae6;
  }
`

const TimeText = styled.span`
  display: inline-block; 
  min-width: 48px;           // keep alignment consistent
  text-align: right;
  padding-right: 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 300;
  position: relative;
  top: -12px;                 
`



const CurrentDateDisplay = styled.button`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.1rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`

const DateDisplay = styled.h2`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
`

// Day View Styles
const DayViewContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 2rem;
  
`

const DayViewGrid = styled.div`
  display: flex;
  min-height: 600px;

`

const DayTimeColumn = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => '#ececec40'};
  
`

const TimeSlot = styled.div`
  position: relative;
  height: 30px;
  display: flex;
  align-items: flex-start;

  /* Only show the line for slots you want (optional) */
  &::after {
    content: '';
    position: absolute;
    top: 0%;               // vertical align middle of the slot
    left: 60px;             // adjust: start after time text width
    width: 20px;            // adjust: desired line length
    height: 1px;
    background: ${({ theme }) => theme.border || '#ECECEC'};
    opacity: 0.5;
    transform: translateY(-50%);
  }
`


const DayEventColumn = styled.div`
  flex: 1;
  padding-left: 1rem;
  position: relative;
  background-image: 
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.border || '#ececec40'} -0.5px,
      ${({ theme }) => theme.border || '#ececec40'} 0.5px,
      transparent -0.5px
    ),
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 59.5px,
      ${({ theme }) => theme.border || '#ececec40'} 59.5px,
      ${({ theme }) => theme.border || '#ececec40'} 60px
    );
`


const DayEventBlock = styled.div`
  background: ${({ color }) => makeGradient(color)};
  border-left: 4px solid ${({ color }) => darken(0.2, color)};
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`

const EventTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: black;

`

const EventTime = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
  font-weight: 400;
  color: black;
`



// Week View Styles
const WeekViewContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 2rem;
  min-width: 1000px;

`

const TimetableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  padding: 0;
  margin: 0 auto;
  /* Prevent right-side overflow */
  overflow-y: hidden;
`

const TimetableScrollInner = styled.div`
  display: flex;
  flex-direction: row; /* not max-content */
  min-width: 100%;    /* fill parent if content is short */
`


const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr); // Change from 5 to 7
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`

const WeekDayHeader = styled.div`
  text-align: center;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
`

const DayNumber = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
`

const DayName = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
`

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr); // Change from 5 to 7
  min-height: 600px;
  min-width: 600px;
  color: #FFFFFF0F;
`

const WeekTimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.border};
`

// const WeekTimeSlot = styled.div`
//   height: 30px;
//   display: flex;
//   align-items: flex-start;
//   padding-top: 4px;
//   border-bottom: 1px solid ${({ theme }) => theme.border};
// `

const WeekDayColumn = styled.div`
  padding: 0;
  border-right: 1px solid ${({ theme }) => theme.border};
  position: relative;
  /* Horizontal lines matching the time slot height (30px in your case) */
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
  transparent 59.5px,
  ${({ theme }) => theme.border || '#ececec40'} 59.5px,
  ${({ theme }) => theme.border || '#ececec40'} 60px
  );

  &:last-child {
    border-right: none;
  }
`

const WeekEventBlock = styled.div`
  background: ${({ color }) => makeGradient(color)};
  border-left: 4px solid ${({ color }) => darken(0.2, color)};
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`

// Month View Styles
const MonthViewContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 2rem;
`

const MonthHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0; // Remove margin-bottom
  border-bottom: none; // Remove border-bottom
  padding-bottom: 0; // Remove padding-bottom
`

const MonthDayHeader = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  margin-bottom: -1px;  // This will overlap with the grid below
  margin-right: -1px;

  &:last-child {
    margin-right: 0;
  }
`

const MonthGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0; // Ensure no gap from the top
`

const MonthWeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const MonthDayCell = styled.div`
  min-height: 100px; // Increased from 100px to 120px to match image
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem; // Increased padding slightly
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.5)};
`

const MonthDayNumber = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme, isCurrentMonth, isHighlighted }) => {
    if (isHighlighted) return '#fff';
    return isCurrentMonth ? theme.textColor : theme.textColorSecondary;
  }};
  background: ${({ isHighlighted }) => (isHighlighted ? '#6d669e' : 'transparent')};
  border-radius: ${({ isHighlighted }) => (isHighlighted ? '50%' : '0')};
  width: ${({ isHighlighted }) => (isHighlighted ? '32px' : 'auto')};
  height: ${({ isHighlighted }) => (isHighlighted ? '32px' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ isHighlighted }) => (isHighlighted ? '0 auto' : '0')};
`

//   background: ${({ color }) => color};
//   color: #fff;
//   border-radius: 4px;
//   padding: 2px 6px;
//   margin-bottom: 2px;
//   font-size: 0.75rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `

// const MonthEventMore = styled.div`
//   font-size: 0.75rem;
//   color: ${({ theme }) => theme.textColorSecondary};
//   margin-top: 4px;
// `

// Existing styles
const AsideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 13.6rem;
`

const TimetableCardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CoursesListInfo = styled.span`
  margin-top: 1rem;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`

const ClashAlerts = styled.div`
  margin-top: 1rem;
`

const RedirectIcon = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
  
  svg {
    color: rgba(0, 0, 0, 0.6);
  }
`