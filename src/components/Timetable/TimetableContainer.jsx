import { LoadingOutlined } from '@ant-design/icons'
import { ChevronLeft, ChevronRight, X, ExternalLink } from '@styled-icons/heroicons-outline'
import { Spin, Alert, Modal, Radio, Tooltip } from 'antd'
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
import { ButtonIconDanger } from 'components/shared/Buttons'
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

  const colorPicker = useColorPicker()
  const getEventsForView = () => {
    const events = []

    courseTimetableList.forEach((item) => {
      const course = coursedata[item.course]
      if (!course) return

      // NOTE: This logic assumes your `slots` data maps Monday to `col: 1`, Tuesday to `col: 2`, etc.
      // `dayIndex` will be 0 for Monday, 1 for Tuesday... 6 for Sunday. This is the standard.
      const createEventHandler = (slotName, type) => {
        const slot = slots[slotName];
        if (slot) {
          events.push({
            id: `${item.id}-${slotName}${type === 'Tutorial' ? '-tut' : ''}`,
            courseCode: item.course,
            title: course.title,
            type,
            dayIndex: slot.col - 1, // Assumes Mon=1 -> 0, Tue=2 -> 1, etc.
            startRow: slot.row.start,
            endRow: slot.row.end,
            startTime: rows[slot.row.start]?.title || '08:30',
            endTime: rows[slot.row.end]?.title || '09:30',
            color: colorPicker(hash(item.id)),
            slotName
          });
        }
      };

      item.lectureSlots.forEach(slotName => createEventHandler(slotName, 'Lecture'));
      item.tutorialSlots.forEach(slotName => createEventHandler(slotName, 'Tutorial'));
    })

    return events
  }

  const events = getEventsForView()


  const getDayViewDateDisplay = (date) => {
    return `${date.format('dddd')}, ${date.format('D MMMM YYYY')}`; // e.g., "Wednesday, 6 August 2025"
  }

  const getDateDisplay = (date) => {
    const start = date.clone().startOf('isoWeek');
    const end = date.clone().endOf('isoWeek');
    if (start.month() === end.month()) {
        return `${start.format('D')} - ${end.format('D MMMM YYYY')}`;
    }
    return `${start.format('D MMM')} - ${end.format('D MMM YYYY')}`;
  }

  const getTodayEvents = () => {
    const today = moment()
    // CORRECTED: Use isoWeekday() for consistency. Mon=1, ..., Sun=7.
    const todayDayIndex = today.isoWeekday() - 1;

    return events.filter(event => {
      if (currentView === 'Day') {
        const selectedDayIndex = currentDate.isoWeekday() - 1;
        return event.dayIndex === selectedDayIndex
      }
      return event.dayIndex === todayDayIndex
    })
  }

  const todayEvents = getTodayEvents()

  const detectClashes = () => {
    const clashes = []
    const eventsByDayAndTime = {}

    events.forEach(event => {
      const key = `${event.dayIndex}-${event.startRow}`
      if (!eventsByDayAndTime[key]) {
        eventsByDayAndTime[key] = []
      }
      eventsByDayAndTime[key].push(event)
    })

    Object.values(eventsByDayAndTime).forEach((eventsInSlot) => {
      if (eventsInSlot.length > 1) {
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const event = eventsInSlot[0]
        const dayName = dayNames[event.dayIndex] || 'Unknown'
        const courseNames = eventsInSlot.map(e => e.courseCode).join(', ')

        clashes.push(
          `Time clash on ${dayName} (${event.startTime} - ${event.endTime}): ${courseNames}`
        )
      }
    })

    return clashes
  }

  const warnings = detectClashes()

  const dayDateString = getDayViewDateDisplay(currentDate);
  const dateString = getDateDisplay(currentDate);
  return (
    <>
      <TimetablePageHeadingWrapper>
        <PageHeading>
          <PageTitle>Timetable</PageTitle>

          <AddButton>
            + add
          </AddButton>
        </PageHeading></TimetablePageHeadingWrapper>

      <SubHeader>
        <TimetableDownloadLink coursesInTimetable={courseTimetableList} />
        <EventCountDisplay>{todayEvents.length} events today</EventCountDisplay>
        <TimetableShareButton coursesInTimetable={courseTimetableList} />
      </SubHeader>

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
        {currentView === 'Day' && (
          <DayView
            currentDate={currentDate}
            events={events}
            slots={slots}
            rows={rows}
            coursedata={coursedata}
            currentView={currentView}
            handleViewChange={handleViewChange}
            handleClickPrev={handleClickPrev}
            handleClickNext={handleClickNext}
            handleTodayClick={handleTodayClick}
            dayDateString={dayDateString}
          />
        )}
        {currentView === 'Week' && (
            <WeekView 
                currentDate={currentDate} 
                events={events} 
                slots={slots} 
                rows={rows} 
                coursedata={coursedata}     
                currentView={currentView}
                handleViewChange={handleViewChange}
                handleClickPrev={handleClickPrev}
                handleClickNext={handleClickNext}
                handleTodayClick={handleTodayClick}
                dayDateString={dateString}
            />
        )}
        {currentView === 'Month' && (
            <MonthView 
                currentDate={currentDate}     
                currentView={currentView}
                handleViewChange={handleViewChange}
                handleClickPrev={handleClickPrev}
                handleClickNext={handleClickNext}
                handleTodayClick={handleTodayClick}
                dayDateString={dayDateString}
            />
        )}
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

const CurrentTimeIndicator = () => {
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    const calculatePosition = () => {
      const now = moment();
      const startTime = moment().startOf('day').add(8.5, 'hours'); // Grid starts at 8:30 AM
      const ROW_HEIGHT = 30; // From DayView/WeekView
      const PIXELS_PER_MINUTE = ROW_HEIGHT / 30; // 30px per 30-min slot

      if (now.hour() >= 8 && now.hour() < 22) {
        const minutesSinceStart = now.diff(startTime, 'minutes');
        setTopPosition(minutesSinceStart * PIXELS_PER_MINUTE);
      } else {
        setTopPosition(-1); // Hide indicator
      }
    };

    calculatePosition();
    const interval = setInterval(calculatePosition, 60000);

    return () => clearInterval(interval);
  }, []);

  if (topPosition < 0) {
    return null;
  }

  return <IndicatorLine style={{ top: `${topPosition}px` }} />;
};

// Day View Component
const DayView = ({ currentDate, events, slots: slotData, rows: rowData, coursedata, currentView,
  handleViewChange,
  handleClickPrev,
  handleClickNext,
  handleTodayClick, dayDateString }) => {
  // CORRECTED: Use isoWeekday for consistency (Mon=1, Sun=7)
  const selectedDayIndex = currentDate.isoWeekday() - 1
  const dayEvents = events.filter(event => event.dayIndex === selectedDayIndex)

  const timeSlots = Object.values(rowData).map(row => row.title)
  const ROW_HEIGHT = 30
  const isToday = currentDate.isSame(moment(), 'day');

  return (
    <DayViewContainer>

      <ControlsLayout>
        <DateDisplay>{dayDateString}</DateDisplay>
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
      </ControlsLayout>
      <DayViewGrid>
        <DayTimeColumn>
          {timeSlots.map((time) => (
            <TimeSlot key={time}>
              {time.endsWith(':30') ? <TimeText>{time}</TimeText> : null}
            </TimeSlot>
          ))}
        </DayTimeColumn>
        <DayEventColumn>
          {isToday && <CurrentTimeIndicator />}
          {dayEvents.map((event) => {
            const course = coursedata[event.courseCode]
            if (!course) return null

            const topPosition = event.startRow * ROW_HEIGHT
            const height = (event.endRow - event.startRow) * ROW_HEIGHT

            return (
              <Tooltip
                key={event.id}
                title={
                  <div>
                    <div><strong>{event.courseCode} - {course.title}</strong></div>
                    <div>Slot: {event.slotName}</div>
                    <div>{event.startTime} - {event.endTime}</div>
                  </div>
                }
                overlayStyle={{ maxWidth: 250, fontSize: '0.9rem', color: '#333' }}
                placement="top"
              >
                <DayEventBlock
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


// ##################################################################
// ##               CORRECTED WeekView COMPONENT                 ##
// ##################################################################
const WeekView = ({ currentDate, events, rows: rowData, coursedata, currentView,
  handleViewChange,
  handleClickPrev,
  handleClickNext,
  handleTodayClick, dayDateString }) => {

  // --- REFACTORED LOGIC ---
  // 1. Get the Monday of the current week. 'isoWeek' is standard and not locale-dependent.
  const startOfWeek = currentDate.clone().startOf('isoWeek');
  
  // 2. Create an array of the 7 moment objects for the week. This is now the single source of truth.
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'days'));

  const timeSlots = Object.values(rowData).map(row => row.title);
  const ROW_HEIGHT = 30;

  return (
    <TimetableWrapper>
      <TimetableScrollInner>
        <WeekViewContainer>
          <ControlsLayout>
            <DateDisplay>{dayDateString}</DateDisplay>
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
          </ControlsLayout>

          <WeekHeader>
            <div /> {/* Empty cell for time column */}
            {/* 3. Map over the generated `daysOfWeek` array. */}
            {daysOfWeek.map(day => (
              <WeekDayHeader key={day.format('YYYY-MM-DD')}>
                {/* Get the date number and day name directly from the moment object. */}
                <DayNumber>{day.format('D')}</DayNumber>
                <DayName>{day.format('ddd').toUpperCase()}</DayName>
              </WeekDayHeader>
            ))}
          </WeekHeader>

          <WeekGrid>
            <WeekTimeColumn>
              {timeSlots.map((time) => (
                <TimeSlot key={time}>
                  {time.endsWith(':30') ? <TimeText>{time}</TimeText> : null}
                </TimeSlot>
              ))}
            </WeekTimeColumn>

            {/* 4. Map over the `daysOfWeek` array again for the columns, using the index. */}
            {daysOfWeek.map((day, dayIndex) => {
              // The index (0-6) will correctly correspond to Monday-Sunday.
              const isToday = day.isSame(moment(), 'day');
              const dayEvents = events.filter(event => event.dayIndex === dayIndex);

              return (
                <WeekDayColumn key={day.format('YYYY-MM-DD')}>
                  <div style={{ position: 'relative', height: '100%' }}>
                    {isToday && <CurrentTimeIndicator />}
                    {dayEvents.map((event) => {
                      const course = coursedata[event.courseCode];
                      if (!course) return null;

                      const topPosition = event.startRow * ROW_HEIGHT;
                      const height = (event.endRow - event.startRow) * ROW_HEIGHT;

                      return (
                        <Tooltip
                          key={event.id}
                          title={
                            <div>
                              <strong>{event.courseCode} - {course.title}</strong>
                              <div>Slot: {event.slotName}</div>
                              <div>{event.startTime} - {event.endTime}</div>
                            </div>
                          }
                          overlayStyle={{ maxWidth: 250, fontSize: '0.9rem', color: '#333' }}
                          placement="top"
                        >
                          <WeekEventBlock
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
                      );
                    })}
                  </div>
                </WeekDayColumn>
              );
            })}
          </WeekGrid>
        </WeekViewContainer>
      </TimetableScrollInner>
    </TimetableWrapper>
  );
};


// Month View Component
// Month View Component
const MonthView = ({ currentDate, currentView,
  handleViewChange,
  handleClickPrev,
  handleClickNext,
  handleTodayClick, dayDateString }) => {
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
      <ControlsLayout>
        <DateDisplay>{currentDate.format('MMMM YYYY')}</DateDisplay>
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
      </ControlsLayout>

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
        {monthGrid.map((weekRow) => (
          // --- THIS IS THE CORRECTED LINE ---
          // The key is now derived from the first day of the week, which is stable and unique.
          <MonthWeekRow key={weekRow[0].format('YYYY-MM-DD')}>
            {weekRow.map((currentDay) => (
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
                // The onClick handler is now simpler
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


export default TimetableContainer

// ##################################################################
// ##                       STYLED COMPONENTS                      ##
// ##                   (No changes needed below)                  ##
// ##################################################################

const IndicatorLine = styled.div`
  position: absolute;
  left: -10px; 
  right: 0;
  height: 1.5px;
  background-color: #eb4d4b;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #eb4d4b;
    transform: translateY(-50%);
  }
`;

const AddButton = styled.button`
  background-color: #6d669e;
  color: #ffffff;
  border: none;
  height: 32px;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${darken(0.1, '#6d669e')};
  }
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textColor};
`;

const TimetablePageHeadingWrapper = styled.div`
  padding-bottom: 0.75rem;
  margin-bottom: -10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const ControlsLayout = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.25rem;
  justify-content: space-between;
`;


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
  border: 0.7px solid #a29ca6;
  border-radius: 8px;
  padding: 4px;
  background: transparent;

  .ant-radio-button-wrapper {
    background: transparent;
    color: #a29ca6;
    border: none !important;
    padding: 6px 16px;
    font-weight: 400;
    border-radius: 6px;
    margin: 0;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

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
    font-weight: 500;
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
  min-width: 30px;
  margin-left: 12px;
  text-align: right;
  padding-right: 5px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  position: relative;
  top: -9px;
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

const DateDisplay = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  margin-bottom: 0;
  font-weight: 500;
`

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

  &::after {
    content: '';
    position: absolute;
    top: 0%;
    left: 60px;
    width: 20px;
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
      transparent 29.5px,
      ${({ theme }) => theme.border || '#ececec40'} 29.5px,
      ${({ theme }) => theme.border || '#ececec40'} 30px
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
  overflow-y: hidden;
`

const TimetableScrollInner = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
`

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  /* The border-bottom and margin-bottom have been removed */
`

const WeekDayHeader = styled.div`
  text-align: center;
  padding: 0.75rem 0.5rem; /* Adjusted padding for better alignment */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  /* Add grid lines to match the columns below */
  border-bottom: 1px solid #FFFFFF0F;
  border-right: 1px solid #FFFFFF0F;

  /* Remove the vertical line on the very last day */
  &:last-child {
    border-right: none;
  }
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
  grid-template-columns: 80px repeat(7, 1fr);
  min-height: 600px;
  min-width: 600px;
  color: #FFFFFF0F;
`

const WeekTimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.border};
`

const WeekDayColumn = styled.div`
  padding: 0;
  border-right: 1px solid ${({ theme }) => theme.border};
  position: relative;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 29.5px,
    ${({ theme }) => theme.border || '#ececec40'} 29.5px,
    ${({ theme }) => theme.border || '#ececec40'} 30px
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

const MonthViewContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 2rem;
`

const MonthHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
`

const MonthDayHeader = styled.div`
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #D6C9F8;
  padding: 0.75rem;
  border: 0.2px solid #D6C9F8;
  background: rgba(255, 255, 255, 0.02);
  margin-bottom: -1px;
  margin-right: -1px;

  &:last-child {
    margin-right: 0;
  }
`

const MonthGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`

const MonthWeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const MonthDayCell = styled.div`
  min-height: 95px; 
  border: 0.2px solid #D6C9F8;
  padding: 0.75rem;
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.5)};
`

const MonthDayNumber = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  color: ${({ theme, isCurrentMonth, isHighlighted }) => {
    if (isHighlighted) return '#fff';
    return isCurrentMonth ? theme.textColor : 'rgba(255, 255, 255, 0.4)';
  }};
  position: relative;
  display: inline-flex;
  align-items: center;
  padding-left: 4px;
  min-width: 32px;
  z-index: 1;

  ${({ isHighlighted }) =>
    isHighlighted &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-22%, -55%);
      width: 32px;
      height: 32px;
      background: rgba(109, 102, 158, 0.4);
      border-radius: 50%;
      z-index: -1;
    }
  `}
`;

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