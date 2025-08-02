import { LoadingOutlined } from '@ant-design/icons'
import { ChevronLeft, ChevronRight, X, Plus, Download, Share } from '@styled-icons/heroicons-outline'
import { Spin, Alert, Modal, Radio } from 'antd'
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

import TimetableSearch from './TimetableSearch'

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
              <TimeText>{time}</TimeText>
            </TimeSlot>
          ))}
        </DayTimeColumn>
        <DayEventColumn>
          {dayEvents.map((event) => {
            const course = coursedata[event.courseCode]
            if (!course) return null
            
            // Calculate position based on actual row indices - align with time slot top
            const topPosition = event.startRow * ROW_HEIGHT
            const height = (event.endRow - event.startRow ) * ROW_HEIGHT
            
            return (
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
                <EventTitle>{event.courseCode} | {event.slotName}</EventTitle>
                <EventTime>{event.startTime} - {event.endTime}</EventTime>
              </DayEventBlock>
            )
          })}
        </DayEventColumn>
      </DayViewGrid>
    </DayViewContainer>
  )
}

// Week View Component  
const WeekView = ({ events, slots: slotData, rows: rowData, coursedata }) => {
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI']
  const timeSlots = Object.values(rowData).map(row => row.title)
  const ROW_HEIGHT = 30 // Height per time slot in pixels

  return (
    <WeekViewContainer>
      <WeekHeader>
        <div /> {/* Empty cell for time column */}
        {weekDays.map((day, index) => (
          <WeekDayHeader key={day}>
            <DayName>{day}</DayName>
          </WeekDayHeader>
        ))}
      </WeekHeader>
      <WeekGrid>
        <WeekTimeColumn>
          {timeSlots.map((time) => (
            <WeekTimeSlot key={time}>
              <TimeText>{time}</TimeText>
            </WeekTimeSlot>
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
                      <EventTitle>{event.courseCode} | {event.slotName}</EventTitle>
                      <EventTime>{event.startTime}</EventTime>
                      {/* <EventType>{event.type}</EventType> */}
                    </WeekEventBlock>
                  )
                })}
            </div>
          </WeekDayColumn>
        ))}
      </WeekGrid>
    </WeekViewContainer>
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

let ajaxRequest = null

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

  const { getQueryString } = useQueryString()
  const [loadingg, setLoadingg] = useState(true)

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

  const fetchCourses = async (params) => {
    setLoadingg(true)

    try {
      if (ajaxRequest) ajaxRequest.cancel()
      ajaxRequest = axios.CancelToken.source()

      const response = await API.courses.list({
        params,
        cancelToken: ajaxRequest.token,
      })
      setCourseData(response.data?.results || [])
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

  return (
    <>
      <PageHeading>
        <PageTitle>Timetable</PageTitle>
        <HeaderActions>
          <ButtonIcon
            icon={<Download size="20" />}
            tooltip="Download"
            hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
          />
          <ButtonIcon
            icon={<Share size="20" />}
            tooltip="Share"
            hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
          />
          <ButtonIcon
            icon={<Plus size="20" />}
            tooltip="Add"
            hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
          />
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
            <CurrentDateDisplay>Today</CurrentDateDisplay>
            <NavButton onClick={handleClickNext}>
              <ChevronRight size="20" />
            </NavButton>
          </NavigationContainer>
        </ViewSelectorContainer>
      </TimetableHeader>

      <DateDisplay>{getCurrentDateDisplay()}</DateDisplay>

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
        {currentView === 'Week' && <WeekView events={events} slots={slots} rows={rows} coursedata={coursedata} />}
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
  border: 1px solid #4a4a4a;
  border-radius: 8px;
  overflow: hidden;
  
  .ant-radio-button-wrapper {
    background: transparent;
    color: #a0a0a0;
    border: none;
    border-radius: 0;
    font-weight: 500;
    padding: 12px 24px;
    margin: 0;
    transition: all 0.2s;
    border-right: 1px solid #4a4a4a;
    line-height: 1.2;
  }
  
  .ant-radio-button-wrapper:last-child {
    border-right: none;
  }
  
  .ant-radio-button-wrapper-checked {
    background: #6d669e;
    color: #fff;
    border-color: #6d669e;
  }
  
  .ant-radio-button-wrapper:hover:not(.ant-radio-button-wrapper-checked) {
    background: #2d273f;
    color: #fff;
  }
  
  .ant-radio-button-wrapper:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  
  .ant-radio-button-wrapper:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

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

const CurrentDateDisplay = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0.5rem;
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
  border-right: 1px solid ${({ theme }) => theme.border};
`

const TimeSlot = styled.div`
  height: 30px;
  display: flex;
  align-items: flex-start;
  padding-top: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`

const TimeText = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`

const DayEventColumn = styled.div`
  flex: 1;
  padding-left: 1rem;
  position: relative;
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
  color: black; /* This will force the text color to black */
`

const EventTime = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
  font-weight: 400;
  color: black; /* This will force the text color to black */
`



// Week View Styles
const WeekViewContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 2rem;
`

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(5, 1fr);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`

const WeekDayHeader = styled.div`
  text-align: center;
`

const DayName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  margin-top: 0.25rem;
`

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(5, 1fr);
  min-height: 600px;
`

const WeekTimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.border};
`

const WeekTimeSlot = styled.div`
  height: 30px;
  display: flex;
  align-items: flex-start;
  padding-top: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`

const WeekDayColumn = styled.div`
  padding: 0;
  border-right: 1px solid ${({ theme }) => theme.border};
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
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`

const MonthDayHeader = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  padding: 0.5rem;
`

const MonthGrid = styled.div`
  display: flex;
  flex-direction: column;
`

const MonthWeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const MonthDayCell = styled.div`
  min-height: 120px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem;
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.5)};
`

const MonthDayNumber = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme, isCurrentMonth, isHighlighted }) => {
    if (isHighlighted) return '#fff';
    return isCurrentMonth ? theme.textColor : theme.textColorSecondary;
  }};
  background: ${({ isHighlighted }) => isHighlighted ? '#6d669e' : 'transparent'};
  border-radius: ${({ isHighlighted }) => isHighlighted ? '50%' : '0'};
  width: ${({ isHighlighted }) => isHighlighted ? '32px' : 'auto'};
  height: ${({ isHighlighted }) => isHighlighted ? '32px' : 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`

// const MonthEventItem = styled.div`
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