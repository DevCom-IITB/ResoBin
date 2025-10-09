import { LoadingOutlined } from '@ant-design/icons'
import {
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Plus,
  Calendar,
  BookOpen,
  Bell,
} from '@styled-icons/heroicons-outline'
import { Spin, Alert, Modal, Radio, Tooltip, Dropdown, Menu } from 'antd'
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

import ExamPlanner from './eplanner_Exam'
import PersonalPlanner from './eplanner_personal'
import ReminderPlanner from './eplanner_reminder'
import EplannerAPI from './eplannerAPI'
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
  // const [reminderItems, ]

  const { getQueryString } = useQueryString()
  let ajaxRequest = null

  const navigate = useNavigate()
  const location = useLocation()
  const autoOpen = location.state?.autoOpen

  const getInitialView = () => {
    if (location.pathname.includes('/day')) return 'Day'
    if (location.pathname.includes('/month')) return 'Month'
    return 'Week'
  }

  const [currentView, setCurrentView] = useState(getInitialView)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [coursesModalVisible, setCoursesModalVisible] = useState(false)

  // Eplanner events state
  const [eplannerEvents, setEplannerEvents] = useState({
    personal: [],
    exam: [],
    reminder: [],
  })

  const handleViewChange = (e) => {
    const newView = e.target.value
    setCurrentView(newView)
    navigate(`/timetable/${newView.toLowerCase()}`)
  }

  const handleDropdownItemClick = (itemType) => {
    setDropdownVisible(false)
    if (itemType === 'courses') {
      setCoursesModalVisible(true)
    } else {
      // Dispatch custom event that the component can listen to
      window.dispatchEvent(new CustomEvent(`toggle-${itemType}-planner`))
    }
  }

  useEffect(() => {
    if (autoOpen === 'reminder') {
      // simulate clicking Add -> Reminder
      handleDropdownItemClick('reminder')

      // clear the flag so it won't auto-trigger again
      try {
        const nextState = { ...(location.state || {}) }
        delete nextState.autoOpen
        navigate(location.pathname + (location.search || ''), {
          replace: true,
          state: nextState,
        })
      } catch {
        // ignore
      }
    } else if (autoOpen === 'personal') {
      handleDropdownItemClick('personal')

      // clear the flag so it won't auto-trigger again
      try {
        const nextState = { ...(location.state || {}) }
        delete nextState.autoOpen
        navigate(location.pathname + (location.search || ''), {
          replace: true,
          state: nextState,
        })
      } catch {
        // ignore
      }
    }
  }, [autoOpen])

  // Fetch eplanner events from API
  const fetchEplannerEvents = async () => {
    try {
      const [personalData, examData, reminderData] = await Promise.all([
        EplannerAPI.getPersonals().catch(() => []),
        EplannerAPI.getExams().catch(() => []),
        EplannerAPI.getReminders().catch(() => []),
      ])

      setEplannerEvents({
        personal: personalData || [],
        exam: examData || [],
        reminder: reminderData || [],
      })
      console.log('Fetched eplanner events:', {
        personalData,
        examData,
        reminderData,
      })
    } catch (error) {
      console.error('Error fetching eplanner events:', error)
    }
  }

  // Edit handler functions for eplanner events
  const handleEditPersonal = useCallback((event) => {
    // Dispatch custom event to trigger personal eplanner modal in edit mode
    window.dispatchEvent(
      new CustomEvent('edit-personal-event', {
        detail: {
          eventId: event.id,
          eventData: event,
        },
      })
    )
  }, [])

  const handleEditExam = useCallback((event) => {
    // Dispatch custom event to trigger exam eplanner modal in edit mode
    window.dispatchEvent(
      new CustomEvent('edit-exam-event', {
        detail: {
          eventId: event.id,
          eventData: event,
        },
      })
    )
  }, [])

  const handleEditReminder = useCallback((event) => {
    // Dispatch custom event to trigger reminder eplanner modal in edit mode
    window.dispatchEvent(
      new CustomEvent('edit-reminder-event', {
        detail: {
          eventId: event.id,
          eventData: event,
        },
      })
    )
  }, [])

  const addDropdownMenu = (
    <AddDropdownMenu>
      <AddMenuItem onClick={() => handleDropdownItemClick('personal')}>
        <AddMenuIcon>
          <Calendar size="16" />
        </AddMenuIcon>
        Personal
      </AddMenuItem>
      <AddMenuItem onClick={() => handleDropdownItemClick('exam')}>
        <AddMenuIcon>
          <BookOpen size="16" />
        </AddMenuIcon>
        Exam
      </AddMenuItem>
      <AddMenuItem onClick={() => handleDropdownItemClick('reminder')}>
        <AddMenuIcon>
          <Bell size="16" />
        </AddMenuIcon>
        Reminder
      </AddMenuItem>
      <AddMenuItem onClick={() => handleDropdownItemClick('courses')}>
        <AddMenuIcon>
          <BookOpen size="16" />
        </AddMenuIcon>
        Courses
      </AddMenuItem>
    </AddDropdownMenu>
  )

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

  // Fetch eplanner events on mount and listen for updates
  useEffect(() => {
    fetchEplannerEvents()

    const handleEplannerUpdate = () => {
      fetchEplannerEvents()
    }

    window.addEventListener('eplanner-updated', handleEplannerUpdate)

    return () => {
      window.removeEventListener('eplanner-updated', handleEplannerUpdate)
    }
  }, [])

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
    setCurrentDate(moment()) // Reset to today's date
    console.log('Today clicked, date reset to:', moment().format('YYYY-MM-DD'))
  }

  const handleSaveCourses = async () => {
    try {
      setLoading(true)
      setCoursesModalVisible(false)
      toast({
        status: 'success',
        content: `Timetable saved successfully with ${courseTimetableList.length} courses!`,
      })
    } catch (error) {
      toast({ status: 'error', content: 'Failed to save timetable changes' })
    } finally {
      setLoading(false)
    }
  }

  const removeFromTimetable = (id) => () => {
    const course =
      coursedata[courseTimetableList.find((item) => item.id === id)?.course]
    const courseName = course?.title ?? 'this course'
    const courseCode = course?.code ?? ''

    Modal.confirm({
      title: `Remove ${courseCode}?`,
      content: (
        <p>
          Are you sure you want to remove{' '}
          <strong>
            {courseCode} : {courseName}
          </strong>{' '}
          from your timetable?
        </p>
      ),
      okText: 'Remove',
      cancelText: 'Cancel',
      centered: true,
      className: 'custom-dark-modal',
      zIndex: 10001, // Higher than courses modal (10000)
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
        const slot = slots[slotName]
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
            slotName,
          })
        }
      }

      item.lectureSlots.forEach((slotName) =>
        createEventHandler(slotName, 'Lecture')
      )
      item.tutorialSlots.forEach((slotName) =>
        createEventHandler(slotName, 'Tutorial')
      )
    })

    // Add eplanner events to the events array
    const addEplannerEvents = () => {
      // Helper to convert time to row index
      const timeToRow = (timeStr) => {
        if (!timeStr) return 0

        // Parse time string
        const [hours, minutes] = timeStr.split(':').map(Number)
        const timeInMinutes = hours * 60 + minutes

        // Time to row mapping based on actual timetable structure (0-based indexing)
        const timeSlots = [
          { time: '08:30', row: 0 },
          { time: '09:00', row: 1 },
          { time: '09:30', row: 2 },
          { time: '10:00', row: 3 },
          { time: '10:30', row: 4 },
          { time: '11:00', row: 5 },
          { time: '11:30', row: 6 },
          { time: '12:00', row: 7 },
          { time: '12:30', row: 8 },
          // Lunch break gap
          { time: '14:00', row: 9 },
          { time: '14:30', row: 10 },
          { time: '15:00', row: 11 },
          { time: '15:30', row: 12 },
          { time: '16:00', row: 13 },
          { time: '16:30', row: 14 },
          { time: '17:00', row: 15 },
          // Evening break gap
          { time: '17:30', row: 16 },
          { time: '18:00', row: 17 },
          { time: '18:30', row: 18 },
          { time: '19:00', row: 19 },
          { time: '19:30', row: 20 },
          { time: '20:00', row: 21 },
          { time: '20:30', row: 22 },
          { time: '21:00', row: 23 },
          { time: '21:30', row: 24 },
          { time: '22:00', row: 25 },
          { time: '22:30', row: 26 },
        ]

        // Convert time slots to minutes for comparison
        const timeSlotsInMinutes = timeSlots.map((slot) => {
          const [h, m] = slot.time.split(':').map(Number)
          return { minutes: h * 60 + m, row: slot.row }
        })

        // Find exact match first
        const exactMatch = timeSlotsInMinutes.find(
          (slot) => slot.minutes === timeInMinutes
        )
        if (exactMatch) {
          return exactMatch.row
        }

        // Find the closest time slot if no exact match
        let closestSlot = timeSlotsInMinutes[0]
        let minDiff = Math.abs(timeInMinutes - closestSlot.minutes)

        for (let i = 1; i < timeSlotsInMinutes.length; i += 1) {
          const diff = Math.abs(timeInMinutes - timeSlotsInMinutes[i].minutes)
          if (diff < minDiff) {
            minDiff = diff
            closestSlot = timeSlotsInMinutes[i]
          }
        }

        return closestSlot.row
      }

      // Helper function to ensure proper event sizing within bounds
      const calculateEventBounds = (startTime, endTime) => {
        const maxRow = 26 // Now includes 22:30 as row 26
        let startRow = timeToRow(startTime)

        // Default span based on event type
        let defaultSpan = 2 // Default 2 rows for personal/reminder
        if (!endTime) defaultSpan = 4 // Default 4 rows for exams without end time

        let endRow = endTime ? timeToRow(endTime) : startRow + defaultSpan

        // Ensure startRow is within bounds
        startRow = Math.max(0, Math.min(startRow, maxRow))

        // For events starting at 21:30 (row 24), ensure they extend exactly 2 rows to 22:30 (row 26)
        if (startRow === 24) {
          endRow = 26 // Always extend to 22:30 for events starting at 21:30
        } else {
          // For other events, cap endRow to maximum available row
          endRow = Math.min(endRow, maxRow)
        }

        // Ensure minimum event size (at least 1 row difference)
        if (endRow <= startRow) {
          endRow = Math.min(startRow + 1, maxRow)
        }

        return { startRow, endRow }
      }

      // Helper to get day index from date
      const getDayIndexFromDate = (dateStr) => {
        if (!dateStr) return -1
        const date = moment(dateStr)
        return date.day() === 0 ? 6 : date.day() - 1 // Convert Sunday=0 to 6, Mon=1 to 0, etc.
      }

      // Process Personal events
      eplannerEvents.personal.forEach((event) => {
        if (!event.date) return
        const startDate = moment(event.date, 'YYYY-MM-DD')
        const repeatType = event.weekdays

        let repeatCount = 1
        let step = 1
        if (repeatType === 'Daily') {
          repeatCount = 30
          step = 1
        } else if (repeatType === 'Weekly') {
          repeatCount = 10
          step = 7
        }
        for (let i = 0; i < repeatCount; i += 1) {
          const thisDate = startDate.clone().add(i * step, 'days')
          const dayIndex = thisDate.day() === 0 ? 6 : thisDate.day() - 1
          const eventDateStr = thisDate.format('YYYY-MM-DD')

          let startRow
          let endRow
          if (event.isAllDay) {
            startRow = 0
            endRow = 2
          } else {
            const bounds = calculateEventBounds(event.starttime, event.endtime)
            startRow = bounds.startRow
            endRow = bounds.endRow
          }
          events.push({
            id: `personal-${event.id}-${eventDateStr}`,
            title: event.title,
            description: event.description,
            type: 'Personal',
            dayIndex,
            startRow,
            endRow,
            startTime: event.starttime || '09:00',
            endTime: event.endtime || '10:00',
            color: '#00D2FF',
            slotName: 'Personal',
            date: event.date, // Original date
            eventDate: eventDateStr, // This occurrence's date
            weekdays: repeatType, // Preserve the repeat pattern
            originalEventId: event.id, // Preserve original event ID
          })
        }
      })

      // Process Exam events
      eplannerEvents.exam.forEach((event) => {
        if (event.date) {
          const eventDate = moment(event.date)
          const dayIndex = eventDate.day() === 0 ? 6 : eventDate.day() - 1 // Convert Sunday=0 to 6, Mon=1 to 0, etc.

          if (dayIndex >= 0) {
            const { startRow, endRow } = calculateEventBounds(
              event.starttime,
              event.endtime || null
            )

            events.push({
              id: `exam-${event.id}`,
              courseCode: event.courseCode,
              title: event.course || event.coursename || event.title || 'Exam',
              course: event.course || event.coursename, // Store the actual course name
              description: event.description,
              type: 'Exam',
              dayIndex,
              startRow,
              endRow,
              startTime: event.starttime || '10:00',
              endTime: event.endtime || '12:00',
              color: '#FF6B35',
              slotName: 'Exam',
              date: event.date,
              eventDate: eventDate.format('YYYY-MM-DD'), // Store formatted date for comparison
            })
          }
        }
      })

      // Process Reminder events
      eplannerEvents.reminder.forEach((event) => {
        if (!event.date) return
        const startDate = moment(event.date, 'YYYY-MM-DD')
        const repeatType = event.weekdays

        // How many times to repeat? (30 days for daily, 10 weeks for weekly, 1 for none)
        let repeatCount = 1
        let step = 1
        if (repeatType === 'Daily') {
          repeatCount = 30
          step = 1
        } else if (repeatType === 'Weekly') {
          repeatCount = 10
          step = 7
        }

        for (let i = 0; i < repeatCount; i += 1) {
          const thisDate = startDate.clone().add(i * step, 'days')
          const dayIndex = thisDate.day() === 0 ? 6 : thisDate.day() - 1
          const eventDateStr = thisDate.format('YYYY-MM-DD')

          let startRow
          let endRow
          if (event.isAllDay) {
            startRow = 0
            endRow = 2
          } else {
            const bounds = calculateEventBounds(event.starttime, event.endtime)
            startRow = bounds.startRow
            endRow = bounds.endRow
          }

          events.push({
            id: `reminder-${event.id}-${eventDateStr}`,
            title: event.title,
            description: event.description,
            type: 'Reminder',
            isAllDay: event.isAllDay,
            dayIndex,
            startRow,
            endRow,
            startTime: event.isAllDay ? 'All Day' : event.starttime || '09:00',
            endTime: event.isAllDay ? '' : event.endtime || '10:00',
            color: '#FF6B6B',
            slotName: 'Reminder',
            date: event.date, // Original date
            eventDate: eventDateStr, // This occurrence's date
            weekdays: repeatType, // Preserve the repeat pattern
            originalEventId: event.id, // Preserve original event ID
          })
        }
      })
    }

    addEplannerEvents()

    return events
  }

  const events = getEventsForView()
  console.log('All Events:', events)

  const getDayViewDateDisplay = (date) => {
    return `${date.format('dddd')}, ${date.format('D MMMM YYYY')}`
  }

  const getDateDisplay = (date) => {
    const start = date.clone().startOf('isoWeek')
    const end = date.clone().endOf('isoWeek')
    if (start.month() === end.month()) {
      return `${start.format('D')} - ${end.format('D MMMM YYYY')}`
    }
    return `${start.format('D MMM')} - ${end.format('D MMM YYYY')}`
  }

  const getTodayEvents = () => {
    const today = moment()
    const todayDayIndex = today.isoWeekday() - 1 // Mon=0, ..., Sun=6
    const todayDateString = today.format('YYYY-MM-DD')

    return events.filter((event) => {
      if (currentView === 'Day') {
        const selectedDayIndex = currentDate.isoWeekday() - 1
        const selectedDateString = currentDate.format('YYYY-MM-DD')

        // For course events, check day index
        if (event.type === 'Lecture' || event.type === 'Tutorial') {
          return event.dayIndex === selectedDayIndex
        }

        // For eplanner events (Personal, Exam, Reminder), check the actual date
        if (event.eventDate) {
          return event.eventDate === selectedDateString
        }
        if (event.date) {
          return moment(event.date).format('YYYY-MM-DD') === selectedDateString
        }

        return event.dayIndex === selectedDayIndex
      }

      // For other views, check today's events
      // For course events, check if today matches the day of week
      if (event.type === 'Lecture' || event.type === 'Tutorial') {
        return event.dayIndex === todayDayIndex
      }

      // For eplanner events (Personal, Exam, Reminder), check the actual date
      if (event.eventDate) {
        return event.eventDate === todayDateString
      }
      if (event.date) {
        return moment(event.date).format('YYYY-MM-DD') === todayDateString
      }

      // Fallback to day index for other events
      return event.dayIndex === todayDayIndex
    })
  }

  const todayEvents = getTodayEvents()

  const detectClashes = () => {
    const clashes = []
    const eventsByDayAndTime = {}

    // Filter out reminder events from clash detection
    events
      .filter((event) => event.type !== 'Reminder')
      .forEach((event) => {
        const key = `${event.dayIndex}-${event.startRow}`
        if (!eventsByDayAndTime[key]) {
          eventsByDayAndTime[key] = []
        }
        eventsByDayAndTime[key].push(event)
      })

    Object.values(eventsByDayAndTime).forEach((eventsInSlot) => {
      if (eventsInSlot.length > 1) {
        const dayNames = [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]
        const event = eventsInSlot[0]
        const dayName = dayNames[event.dayIndex] || 'Unknown'
        const courseNames = eventsInSlot.map((e) => e.courseCode).join(', ')

        clashes.push(
          `Time clash on ${dayName} (${event.startTime} - ${event.endTime}): ${courseNames}`
        )
      }
    })

    return clashes
  }

  const warnings = detectClashes()

  const dayDateString = getDayViewDateDisplay(currentDate)
  const dateString = getDateDisplay(currentDate)
  return (
    <>
      <TimetablePageHeadingWrapper>
        <PageHeading>
          <PageTitle>Timetable</PageTitle>

          <Dropdown
            overlay={addDropdownMenu}
            trigger={['click']}
            visible={dropdownVisible}
            onVisibleChange={setDropdownVisible}
            placement="bottomRight"
          >
            <AddButton onClick={() => setDropdownVisible(!dropdownVisible)}>
              <Plus size="16" />
              add
            </AddButton>
          </Dropdown>
        </PageHeading>
      </TimetablePageHeadingWrapper>

      <SubHeader>
        <TimetableDownloadLink coursesInTimetable={courseTimetableList} />
        <EventCountDisplay>{todayEvents.length} events today</EventCountDisplay>
        <TimetableShareButton coursesInTimetable={courseTimetableList} />
      </SubHeader>

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
            handleEditPersonal={handleEditPersonal}
            handleEditExam={handleEditExam}
            handleEditReminder={handleEditReminder}
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
            handleEditPersonal={handleEditPersonal}
            handleEditExam={handleEditExam}
            handleEditReminder={handleEditReminder}
          />
        )}
        {currentView === 'Month' && (
          <MonthView
            currentDate={currentDate}
            events={events}
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

      {/* Courses Modal */}
      {coursesModalVisible && (
        <CoursesModal>
          <CoursesModalContent>
            <CoursesModalHeader>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '32px',
                  width: '40px',
                  backgroundColor: '#3b3452',
                  borderRadius: '6px',
                  marginRight: '12px',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  style={{ width: '30px', height: '20px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 4.5A1.5 1.5 0 018.25 3h7.5a1.5 1.5 0 011.5 1.5v16.75a.75.75 0 01-1.155.629L12 17.25l-4.095 2.879A.75.75 0 016.75 21.25V4.5z"
                  />
                </svg>
              </div>
              <h2>Courses</h2>
              <CloseButton onClick={() => setCoursesModalVisible(false)}>
                ✕
              </CloseButton>
            </CoursesModalHeader>
            <div style={{ width: '100%' }}>
              <TimetableSearch
                loading={loadingg}
                setLoading={setLoadingg}
                data={courseData}
                addToTimetable={addToTimetable}
              />
            </div>

            <h2
              style={{ color: 'white', fontWeight: 'bold', paddingTop: '16px' }}
            >
              My Courses
            </h2>

            <CoursesContainer>
              <CoursesCardGrid>
                {courseTimetableList.map(({ id, course }) => (
                  <CourseCardSmall key={id}>
                    <CourseCardContent>
                      <CourseCodeTitle>{course}</CourseCodeTitle>
                      {/* <CourseSubtitle>{coursedata[course]?.title || 'Loading...'}</CourseSubtitle>
                      <CourseCreditsText>Credits: {coursedata[course]?.credits || 'N/A'}</CourseCreditsText> */}
                    </CourseCardContent>
                    <RemoveButtonCard
                      onClick={removeFromTimetable(id)}
                      title="Remove from timetable"
                    >
                      remove
                    </RemoveButtonCard>
                  </CourseCardSmall>
                ))}
                {courseTimetableList.length === 0 && (
                  <EmptyState>
                    <EmptyStateIcon>📚</EmptyStateIcon>
                    <EmptyStateText>No courses added yet</EmptyStateText>
                    <EmptyStateSubtext>
                      Use the search above to add courses to your timetable
                    </EmptyStateSubtext>
                  </EmptyState>
                )}
              </CoursesCardGrid>

              <SaveButtonContainer>
                <SaveButton onClick={handleSaveCourses} disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </SaveButton>
              </SaveButtonContainer>
            </CoursesContainer>
          </CoursesModalContent>
        </CoursesModal>
      )}

      {/* Eplanner Components - Hidden buttons, only triggered by dropdown events */}
      <PersonalPlanner
        hideButton
        selectedDate={currentDate.format('YYYY-MM-DD')}
      />
      <ExamPlanner hideButton selectedDate={currentDate.format('YYYY-MM-DD')} />
      <ReminderPlanner
        hideButton
        selectedDate={currentDate.format('YYYY-MM-DD')}
      />
    </>
  )
}

const CurrentTimeIndicator = () => {
  const [topPosition, setTopPosition] = useState(0)

  useEffect(() => {
    const calculatePosition = () => {
      const now = moment()
      const startTime = moment().startOf('day').add(8.5, 'hours') // Grid starts at 8:30 AM
      const ROW_HEIGHT = 30 // From DayView/WeekView
      const PIXELS_PER_MINUTE = ROW_HEIGHT / 30 // 30px per 30-min slot

      if (now.hour() >= 8 && now.hour() < 22) {
        const minutesSinceStart = now.diff(startTime, 'minutes')
        setTopPosition(minutesSinceStart * PIXELS_PER_MINUTE)
      } else {
        setTopPosition(-1) // Hide indicator
      }
    }

    calculatePosition()
    const interval = setInterval(calculatePosition, 60000)

    return () => clearInterval(interval)
  }, [])

  if (topPosition < 0) {
    return null
  }

  return <IndicatorLine style={{ top: `${topPosition}px` }} />
}

// Day View Component
const DayView = ({
  currentDate,
  events,
  slots: slotData,
  rows: rowData,
  coursedata,
  currentView,
  handleViewChange,
  handleClickPrev,
  handleClickNext,
  handleTodayClick,
  dayDateString,
  handleEditPersonal,
  handleEditExam,
  handleEditReminder,
}) => {
  // --- REFACTORED LOGIC (following WeekView pattern) ---
  // 1. Get the specific day as a moment object - this is our single source of truth
  // This follows the same pattern as WeekView where we use moment objects consistently
  const selectedDay = currentDate.clone()
  const selectedDayIndex = selectedDay.isoWeekday() - 1 // Convert to 0-6 (Mon=0, Sun=6)
  const currentDateStr = selectedDay.format('YYYY-MM-DD')

  const dayEvents = events.filter((event) => {
    // For course events (have type 'Lecture' or 'Tutorial'), filter by dayIndex only
    if (event.type === 'Lecture' || event.type === 'Tutorial') {
      return event.dayIndex === selectedDayIndex
    }

    // For eplanner events (have type 'Personal', 'Exam'), check both dayIndex and specific date
    if (event.type === 'Personal' || event.type === 'Exam') {
      return (
        event.dayIndex === selectedDayIndex &&
        event.eventDate === currentDateStr
      )
    }

    return false
  })

  const timeSlots = Object.values(rowData).map((row) => row.title)
  const ROW_HEIGHT = 30

  // Process events for display - courses have absolute priority and overlap eplanner events
  const processEventsForDisplay = (eventsToProcess) => {
    const processedEvents = []

    // Separate courses and eplanner events
    const courseEvents = eventsToProcess.filter(
      (event) => event.type === 'Lecture' || event.type === 'Tutorial'
    )
    const eplannerEvents = eventsToProcess.filter(
      (event) => event.type === 'Personal' || event.type === 'Exam'
    )

    // Function to check if two events overlap
    const eventsOverlap = (event1, event2) => {
      return event1.startRow < event2.endRow && event1.endRow > event2.startRow
    }

    // Add eplanner events only if they don't overlap with any course
    eplannerEvents.forEach((eplannerEvent) => {
      const hasOverlappingCourse = courseEvents.some((courseEvent) => {
        return eventsOverlap(eplannerEvent, courseEvent)
      })

      if (!hasOverlappingCourse) {
        processedEvents.push({
          ...eplannerEvent,
          displayStartRow: eplannerEvent.startRow,
          displayTop: eplannerEvent.startRow * ROW_HEIGHT,
          displayHeight:
            (eplannerEvent.endRow - eplannerEvent.startRow) * ROW_HEIGHT,
          stackPosition: 0,
          totalInStack: 1,
          zIndex: 5,
        })
      }
    })

    // Add all course events (they have priority)
    courseEvents.forEach((event) => {
      processedEvents.push({
        ...event,
        displayStartRow: event.startRow,
        displayTop: event.startRow * ROW_HEIGHT,
        displayHeight: (event.endRow - event.startRow) * ROW_HEIGHT,
        stackPosition: 0,
        totalInStack: 1,
        zIndex: 10,
      })
    })

    return processedEvents
  }

  const processedDayEvents = processEventsForDisplay(dayEvents)
  const isToday = selectedDay.isSame(moment(), 'day')

  return (
    <TimetableWrapper>
      <TimetableScrollInner>
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
              {processedDayEvents.map((event) => {
                const course = coursedata[event.courseCode]

                // Handle eplanner events (Personal, Exam)
                if (event.type && ['Personal', 'Exam'].includes(event.type)) {
                  // For Exam events, prioritize the course name, then description, then title
                  let displayName = event.description?.trim()
                  if (!displayName) {
                    if (event.type === 'Exam') {
                      // For exam events, use the course field first, then try coursedata lookup
                      displayName = event.course || event.coursename
                      if (
                        !displayName &&
                        event.courseCode &&
                        coursedata[event.courseCode]
                      ) {
                        displayName =
                          coursedata[event.courseCode]?.title ||
                          event.courseCode
                      }
                      if (!displayName) {
                        displayName = event.title
                      }
                    } else {
                      displayName = event.title
                    }
                  }
                  return (
                    <Tooltip
                      key={event.id}
                      title={
                        <div>
                          <div>
                            <strong>
                              {event.title} ({event.type})
                            </strong>
                          </div>
                          {event.description && <div>{event.description}</div>}
                          <div>
                            {event.isAllDay
                              ? 'All Day'
                              : `${event.startTime} - ${event.endTime}`}
                          </div>
                          {event.date && <div>Date: {event.date}</div>}
                        </div>
                      }
                      overlayStyle={{
                        maxWidth: 250,
                        fontSize: '0.9rem',
                        color: '#333',
                      }}
                      placement="top"
                    >
                      <DayEventBlock
                        color={event.color}
                        style={{
                          position: 'absolute',
                          top: `${event.displayTop}px`,
                          width: `${event.displayWidth}px`,
                          height: `${event.displayHeight}px`,
                          padding: '0', // Remove padding for eplanner events
                          zIndex: event.zIndex || 5,
                        }}
                      >
                        <div
                          style={{
                            textAlign: 'center',
                            color: 'white',
                            padding: '4px',
                            height: '100%',
                            width: '100%',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderRadius: '8px',
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: -3,
                              top: 0,
                              zIndex: 100,
                              maxWidth: 'calc(100% - 56px)',
                              margin: 0,
                            }}
                          >
                            <div
                              style={{
                                fontSize:
                                  event.totalInStack > 1 ? '0.8rem' : '1rem',
                                fontWeight: '500',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'left',
                                color: 'black',
                                background: 'transparent',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                marginBottom: '-0.6rem',
                              }}
                            >
                              {event.title} |{' '}
                              {event.endRow - event.startRow >= 2 && (
                                <span>{event.type}</span>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '0.9rem',
                              opacity: 0.9,
                              // fontWeight: '500',
                              color: 'black',
                              flexDirection: 'row',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginTop: '30px',
                                marginLeft: '5px',
                                flexDirection: 'row',
                              }}
                            >
                              {event.isAllDay
                                ? 'All Day'
                                : `${event.startTime.substring(
                                    0,
                                    5
                                  )} - ${event.endTime.substring(0, 5)}`}
                            </div>
                            <div
                              style={{
                                marginBottom: '8px',
                                marginRight: '9px',
                              }}
                            >
                              <button
                                type="button"
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '2px 4px',
                                  cursor: 'pointer',
                                  color: 'black',
                                }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  if (event.type === 'Personal')
                                    handleEditPersonal(event)
                                  else if (event.type === 'Exam')
                                    handleEditExam(event)
                                }}
                                title="Edit Event"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                              </button>

                              {/* <button type="button" style={{
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '2px 4px',
                            cursor: 'pointer',
                            color: 'black'
                          }} onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Bookmark functionality will be added later
                          }} title="Bookmark Event">
                            <svg width="30" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l7-3 7 3z"/>
                            </svg>
                          </button> */}
                            </div>
                          </div>
                        </div>
                      </DayEventBlock>
                    </Tooltip>
                  )
                }

                // Handle course events
                if (!course) return null

                return (
                  <Tooltip
                    key={event.id}
                    title={
                      <div>
                        <div>
                          <strong>
                            {event.courseCode} - {course.title}
                          </strong>
                        </div>
                        <div>Slot: {event.slotName}</div>
                        <div>
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    }
                    overlayStyle={{
                      maxWidth: 250,
                      fontSize: '0.9rem',
                      color: '#333',
                    }}
                    placement="top"
                  >
                    <DayEventBlock
                      color={event.color}
                      style={{
                        position: 'absolute',
                        top: `${event.displayTop}px`,
                        width: `${event.displayWidth}px`,
                        height: `${event.displayHeight}px`,
                        zIndex: event.zIndex || 10,
                      }}
                    >
                      <Link
                        to={coursePageUrl(event.courseCode, course.title)}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <EventTitle
                              style={{
                                fontSize:
                                  event.totalInStack > 1 ? '0.8rem' : '1rem',
                              }}
                            >
                              {event.courseCode} | {event.slotName} |{' '}
                              {event.endRow - event.startRow >= 2 &&
                                (event.slotName &&
                                event.slotName.startsWith('L')
                                  ? 'Lab'
                                  : 'Lecture')}
                            </EventTitle>
                            <EventTime
                              style={{
                                fontSize:
                                  event.totalInStack > 1 ? '0.7rem' : '0.8rem',
                              }}
                            >
                              {event.startTime} - {event.endTime}
                            </EventTime>
                          </div>
                          {/* <div style={{ display: 'flex', gap: '4px' }}>
                        <button type="button" style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '2px 4px',
                          cursor: 'pointer',
                          color: 'black'
                        }} onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Bookmark functionality will be added later
                        }}>
                          <svg width="30" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l7-3 7 3z"/>
                          </svg>
                        </button>
                      </div> */}

                          <RedirectIcon>
                            <ExternalLink size="16" />
                          </RedirectIcon>
                        </div>
                      </Link>
                    </DayEventBlock>
                  </Tooltip>
                )
              })}
            </DayEventColumn>
          </DayViewGrid>
        </DayViewContainer>
      </TimetableScrollInner>
    </TimetableWrapper>
  )
}

// ##################################################################
// ##               CORRECTED WeekView COMPONENT                 ##
// ##################################################################
const WeekView = ({
  currentDate,
  events,
  rows: rowData,
  coursedata,
  currentView,
  handleViewChange,
  handleClickPrev,
  handleClickNext,
  handleTodayClick,
  dayDateString,
  handleEditPersonal,
  handleEditExam,
  handleEditReminder,
}) => {
  // --- REFACTORED LOGIC ---
  // 1. Get the Monday of the current week. 'isoWeek' is standard and not locale-dependent.
  const startOfWeek = currentDate.clone().startOf('isoWeek')

  // 2. Create an array of the 7 moment objects for the week. This is now the single source of truth.
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.clone().add(i, 'days')
  )

  const timeSlots = Object.values(rowData).map((row) => row.title)
  const ROW_HEIGHT = 30

  // Process events for display - courses have absolute priority and overlap eplanner events
  const processEventsForDisplay = (eventsToProcess) => {
    const processedEvents = []

    // Separate courses and eplanner events
    const courseEvents = eventsToProcess.filter(
      (event) => event.type === 'Lecture' || event.type === 'Tutorial'
    )
    const eplannerEvents = eventsToProcess.filter(
      (event) => event.type === 'Personal' || event.type === 'Exam'
    )

    // Function to check if two events overlap
    const eventsOverlap = (event1, event2) => {
      return event1.startRow < event2.endRow && event1.endRow > event2.startRow
    }

    // Add eplanner events only if they don't overlap with any course
    eplannerEvents.forEach((eplannerEvent) => {
      const hasOverlappingCourse = courseEvents.some((courseEvent) =>
        eventsOverlap(eplannerEvent, courseEvent)
      )

      if (!hasOverlappingCourse) {
        processedEvents.push({
          ...eplannerEvent,
          displayStartRow: eplannerEvent.startRow,
          displayTop: eplannerEvent.startRow * ROW_HEIGHT,
          displayHeight:
            (eplannerEvent.endRow - eplannerEvent.startRow) * ROW_HEIGHT,
          stackPosition: 0,
          totalInStack: 1,
          zIndex: 5,
        })
      }
    })

    // Add all course events (they have priority)
    courseEvents.forEach((event) => {
      processedEvents.push({
        ...event,
        displayStartRow: event.startRow,
        displayTop: event.startRow * ROW_HEIGHT,
        displayHeight: (event.endRow - event.startRow) * ROW_HEIGHT,
        stackPosition: 0,
        totalInStack: 1,
        zIndex: 10,
      })
    })

    return processedEvents
  }

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
            {daysOfWeek.map((day) => (
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
              const isToday = day.isSame(moment(), 'day')
              const currentDayStr = day.format('YYYY-MM-DD')

              const dayEvents = events.filter((event) => {
                // For course events (have type 'Lecture' or 'Tutorial'), filter by dayIndex only
                if (event.type === 'Lecture' || event.type === 'Tutorial') {
                  return event.dayIndex === dayIndex
                }

                // For eplanner events (have type 'Personal', 'Exam'), check both dayIndex and specific date
                if (event.type === 'Personal' || event.type === 'Exam') {
                  return (
                    event.dayIndex === dayIndex &&
                    event.eventDate === currentDayStr
                  )
                }

                return false
              })

              // Process events for overlapping display
              const processedDayEvents = processEventsForDisplay(dayEvents)

              return (
                <WeekDayColumn key={day.format('YYYY-MM-DD')}>
                  <div style={{ position: 'relative', height: '100%' }}>
                    {isToday && <CurrentTimeIndicator />}
                    {processedDayEvents.map((event) => {
                      const course = coursedata[event.courseCode]
                      // console.log(course);

                      // Handle eplanner events (Personal, Exam)
                      if (
                        event.type &&
                        ['Personal', 'Exam'].includes(event.type)
                      ) {
                        // For Exam events, prioritize the course name, then description, then title
                        let displayName = event.description?.trim()
                        if (!displayName) {
                          if (event.type === 'Exam') {
                            // For exam events, use the course field first, then try coursedata lookup
                            displayName = event.course || event.coursename
                            if (
                              !displayName &&
                              event.courseCode &&
                              coursedata[event.courseCode]
                            ) {
                              displayName =
                                coursedata[event.courseCode]?.title ||
                                event.courseCode
                            }
                            if (!displayName) {
                              displayName = event.title
                            }
                          } else {
                            displayName = event.title
                          }
                        }

                        return (
                          <Tooltip
                            key={event.id}
                            title={
                              <div>
                                <strong>
                                  {event.title} ({event.type})
                                </strong>
                                {event.description && (
                                  <div>{event.description}</div>
                                )}
                                <div>
                                  {event.isAllDay
                                    ? 'All Day'
                                    : `${event.startTime} - ${event.endTime}`}
                                </div>
                                {event.date && <div>Date: {event.date}</div>}
                              </div>
                            }
                            overlayStyle={{
                              maxWidth: 250,
                              fontSize: '0.9rem',
                              color: '#333',
                            }}
                            placement="top"
                          >
                            <WeekEventBlock
                              color={event.color}
                              style={{
                                position: 'absolute',
                                top: `${event.displayTop}px`,
                                width: `${event.displayWidth}px`,
                                height: `${event.displayHeight}px`,
                                padding: '0', // Remove padding for eplanner events
                                zIndex: event.zIndex || 5,
                              }}
                            >
                              <div>
                                <div>
                                  <div
                                    style={{
                                      fontSize: '0.7rem',
                                      fontWeight: '600',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      textAlign: 'left',
                                      color: '#222',
                                      background: 'transparent',
                                      padding: '0.3rem',
                                      borderRadius: '8px',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {event.title}
                                  </div>
                                  {(event.isAllDay || event.startTime) && (
                                    <div
                                      style={{
                                        fontSize: '0.5rem',
                                        fontWeight: '500',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'left',
                                        color: '#222',
                                        background: 'transparent',
                                        padding: '0.3rem',
                                        marginBottom: '-27px',
                                      }}
                                    >
                                      {event.isAllDay
                                        ? 'All Day'
                                        : event.startTime.substring(0, 5)}
                                    </div>
                                  )}
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '0.5rem',
                                    opacity: 0.9,
                                    fontWeight: '500',
                                    color: 'black',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      fontSize: '0.7rem',
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      padding: '0.3rem',
                                      marginBottom: '0.5rem',
                                      marginTop: '5px',
                                    }}
                                  >
                                    <span>{event.type}</span>
                                  </div>
                                  <div style={{ margin: '30px 0px 10px 10px' }}>
                                    <button
                                      type="button"
                                      style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '2px 4px',
                                        cursor: 'pointer',
                                        color: 'black',
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        if (event.type === 'Personal')
                                          handleEditPersonal(event)
                                        else if (event.type === 'Exam')
                                          handleEditExam(event)
                                      }}
                                      title="Edit Event"
                                    >
                                      <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                      >
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                      </svg>
                                    </button>

                                    {/*                        
                          <button type="button" style={{
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0px 4px',
                            cursor: 'pointer',
                            color: 'black'
                          }} onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Bookmark functionality will be added later
                          }} title="Bookmark Event">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l7-3 7 3z"/>
                            </svg>
                          </button> */}
                                  </div>
                                </div>
                              </div>
                            </WeekEventBlock>
                          </Tooltip>
                        )
                      }

                      // Handle course events
                      if (!course) return null

                      return (
                        <Tooltip
                          key={event.id}
                          title={
                            <div>
                              <strong>
                                {event.courseCode} - {course.title}
                              </strong>
                              <div>Slot: {event.slotName}</div>
                              <div>
                                {event.startTime.slice(0, 5)} -{' '}
                                {event.endTime.slice(0, 5)}
                              </div>
                            </div>
                          }
                          overlayStyle={{
                            maxWidth: 250,
                            fontSize: '0.9rem',
                            color: '#333',
                          }}
                          placement="top"
                        >
                          <WeekEventBlock
                            color={event.color}
                            style={{
                              position: 'absolute',
                              top: `${event.displayTop}px`,
                              width: `${event.displayWidth}px`,
                              height: `${event.displayHeight}px`,
                              zIndex: event.zIndex || 10,
                            }}
                          >
                            <Link
                              to={coursePageUrl(event.courseCode, course.title)}
                              style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                width: '80%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    display: 'Flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <div
                                    style={{ justifyContent: 'space-between' }}
                                  >
                                    <div
                                      style={{
                                        flex: 1,
                                        marginBottom: '-2.5rem',
                                      }}
                                    >
                                      <div style={{ marginBottom: '-0.25rem' }}>
                                        <EventTitle
                                          style={{ fontSize: '0.7rem' }}
                                        >
                                          {event.courseCode} | {event.slotName}
                                        </EventTitle>
                                      </div>
                                      <div style={{ marginBottom: '-0.35rem' }}>
                                        <EventTime
                                          style={{
                                            fontSize: '0.5rem',
                                            fontWeight: '500',
                                          }}
                                        >
                                          {event.startTime}
                                        </EventTime>
                                      </div>
                                      <div
                                        style={{
                                          fontSize: '0.7rem',
                                          color: 'black',
                                          fontWeight: '500',
                                          marginBottom: '3rem',
                                        }}
                                      >
                                        {event.slotName &&
                                        event.slotName.startsWith('L')
                                          ? 'Lab'
                                          : 'Lecture'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'right',
                                }}
                              >
                                <RedirectIcon>
                                  <ExternalLink size="16" />
                                </RedirectIcon>
                              </div>
                            </Link>
                          </WeekEventBlock>
                        </Tooltip>
                      )
                    })}
                  </div>
                </WeekDayColumn>
              )
            })}
          </WeekGrid>
        </WeekViewContainer>
      </TimetableScrollInner>
    </TimetableWrapper>
  )
}

// Month View Component
const MonthView = ({
  currentDate,
  events,
  currentView,
  handleViewChange,
  handleClickPrev,
  handleClickNext,
  handleTodayClick,
  dayDateString,
}) => {
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
          // The key is now derived from the first day of the week, which is stable and unique.
          <MonthWeekRow key={weekRow[0].format('YYYY-MM-DD')}>
            {weekRow.map((currentDay) => {
              // Filter events for this specific day
              const dayEvents = events.filter((event) => {
                // For eplanner events (Personal, Exam, Reminder), check eventDate first
                if (
                  event.type === 'Personal' ||
                  event.type === 'Exam' ||
                  event.type === 'Reminder'
                ) {
                  if (event.eventDate) {
                    return moment(event.eventDate).isSame(currentDay, 'day')
                  }
                  // Fallback to original date if eventDate is not available
                  if (event.date) {
                    return moment(event.date).isSame(currentDay, 'day')
                  }
                  return false
                }

                // For course events (Lecture, Tutorial), check if it's the right day of week
                // if (event.type === 'Lecture' || event.type === 'Tutorial') {
                //   const currentDayIndex = currentDay.day() === 0 ? 6 : currentDay.day() - 1;
                //   return event.dayIndex === currentDayIndex;
                // }

                // Fallback for other event types
                if (event.date) {
                  return moment(event.date).isSame(currentDay, 'day')
                }
                return false
              })

              return (
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

                  {/* Display events for this day */}
                  {dayEvents.map((event) => {
                    let timeDisplay = null

                    // For eplanner events, show time information (not title)
                    if (
                      event.type === 'Personal' ||
                      event.type === 'Exam' ||
                      event.type === 'Reminder'
                    ) {
                      if (event.isAllDay) {
                        timeDisplay = (
                          <div
                            style={{
                              color: event.color,
                              opacity: 0.8,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontSize: '0.7rem',
                              flexShrink: 0,
                            }}
                          >
                            All Day
                          </div>
                        )
                      } else if (event.startTime) {
                        timeDisplay = (
                          <div
                            style={{
                              color: event.color,
                              opacity: 0.8,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontSize: '0.7rem',
                              flexShrink: 0,
                              marginTop: '3px',
                              // paddingTop: '3px',
                            }}
                          >
                            {event.startTime.slice(0, 5)}
                          </div>
                        )
                      }
                    } else if (event.isAllDay) {
                      // For course events, keep original logic
                      timeDisplay = (
                        <div
                          style={{
                            color: event.color,
                            opacity: 0.8,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '0.7rem',
                            flexShrink: 0,
                          }}
                        >
                          {event.title}
                        </div>
                      )
                    } else if (event.startTime) {
                      timeDisplay = (
                        <div
                          style={{
                            color: event.color,
                            opacity: 0.8,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '0.7rem',
                            flexShrink: 0,
                          }}
                        >
                          {event.startTime.slice(0, 5)}
                        </div>
                      )
                    }
                    return (
                      <MonthEventBlock key={event.id} color={event.color}>
                        <div
                          style={{
                            marginTop: '3px',
                            color: event.color,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          {(() => {
                            // For eplanner events (Personal, Exam, Reminder), show appropriate title
                            if (
                              event.type === 'Personal' ||
                              event.type === 'Exam' ||
                              event.type === 'Reminder'
                            ) {
                              // For Exam events, prioritize the course name
                              if (event.type === 'Exam') {
                                return (
                                  event.course ||
                                  event.coursename ||
                                  event.title
                                )
                              }
                              return event.title
                            }

                            // For course events, check if event duration is less than 1 hour
                            let showType = true
                            if (event.startTime && event.endTime) {
                              const startHour = parseInt(
                                event.startTime.split(':')[0],
                                10
                              )
                              const startMin = parseInt(
                                event.startTime.split(':')[1],
                                10
                              )
                              const endHour = parseInt(
                                event.endTime.split(':')[0],
                                10
                              )
                              const endMin = parseInt(
                                event.endTime.split(':')[1],
                                10
                              )
                              const durationMinutes =
                                endHour * 60 +
                                endMin -
                                (startHour * 60 + startMin)
                              showType = durationMinutes >= 60
                            } else if (event.endRow && event.startRow) {
                              showType = event.endRow - event.startRow >= 2
                            }
                            return showType
                              ? event.type || event.title
                              : event.title
                          })()}
                        </div>
                        {timeDisplay}
                      </MonthEventBlock>
                    )
                  })}
                </MonthDayCell>
              )
            })}
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
`

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
  gap: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${darken(0.1, '#6d669e')};
  }
`

const AddDropdownMenu = styled.div`
  background: #2b273b;
  border: 1px solid #6d669e;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 160px;
`

const AddMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(109, 102, 158, 0.2);
    color: #ffffff;
  }

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`

const AddMenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(109, 102, 158, 0.3);
  color: #ffffff;

  svg {
    width: 16px;
    height: 16px;
  }
`

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textColor};
`

const TimetablePageHeadingWrapper = styled.div`
  padding-bottom: 0.75rem;
  margin-bottom: -10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const ControlsLayout = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.25rem;
  justify-content: space-between;
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
  top: -10px;
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
  width: 100%;
  max-width: 100%;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`

const DayViewGrid = styled.div`
  display: flex;
  min-width: 800px;
  width: 100%;
  border-radius: 8px;
`

const DayTimeColumn = styled.div`
  width: 80px;
  flex-shrink: 0;
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
  min-width: 0;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
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
  padding: 0.5rem;
  // margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
  z-index: 10;
  position: relative;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
  box-sizing: border-box;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 15;
  }
`

const EventTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const EventTime = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
  font-weight: 400;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const EventText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const WeekViewContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
`

const TimetableWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  padding: 0;
  margin: 0 auto;
  overflow: hidden;
  contain: layout style;
`

const TimetableScrollInner = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  min-width: 800px;
  width: 100%;
  /* The border-bottom and margin-bottom have been removed */
`

const WeekDayHeader = styled.div`
  text-align: center;
  padding: 0.75rem 0.5rem; /* Adjusted padding for better alignment */
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 0.5rem;
  justify-content: center;
  /* Add grid lines to match the columns below */
  border-bottom: 1px solid #ffffff0f;
  border-right: 1px solid #ffffff0f;

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
  min-height: 100px;
  min-width: 800px;
  width: 100%;
  color: #ffffff0f;
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
  min-width: 0;
  width: 100%;

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
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
  // align: right;
  width: 101%;
  box-sizing: border-box;
  z-index: 5;
  position: relative;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    z-index: 6;
  }

  /* Handle text overflow in week view */
  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  color: #d6c9f8;
  padding: 0.75rem;
  border: 0.2px solid #d6c9f8;
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
  min-width: 100px;
  border: 0.2px solid #d6c9f8;
  padding: 0.75rem;
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.5)};
`

const MonthDayNumber = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  color: ${({ theme, isCurrentMonth, isHighlighted }) => {
    if (isHighlighted) return '#fff'
    return isCurrentMonth ? theme.textColor : 'rgba(255, 255, 255, 0.4)'
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
      left: 30%;
      top: 45%;
      transform: translate(-50%, -50%);
      width: 39px;
      height: 39px;
      background: rgba(109, 102, 158, 0.4);
      border-radius: 50%;
      z-index: -1;
    }
  `}
`

const MonthEventBlock = styled.div`
  background: ${({ color }) => color};
  background-color: transparent;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  border-radius: 4px;
  padding: 1.3px 4px;
  margin: 10px 0;
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1px;
`

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

// Courses Modal Styled Components
const CoursesModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`

const CoursesModalContent = styled.div`
  background: #2b273b;
  border-radius: 16px;
  padding: 1rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const CoursesModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    color: white;
    padding-right: 280px;
    font-size: 1.5rem;
    font-weight: 600;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

const CoursesContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const CoursesCardGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 2rem;
`

const CourseCardSmall = styled.div`
  background: #1b1728;
  border-radius: 12px;
  padding: 1.5rem;
  height: 10px;
  position: relative;
  // border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`

const CourseCodeTitle = styled.h3`
  color: white;
  margin: -10px 20px 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  padding-bottom: 10px;
`

const CourseSubtitle = styled.p`
  color: #9ca3af;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
`

const CourseCreditsText = styled.p`
  color: #9ca3af;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 500;
`

const RemoveButtonCard = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #d2c4f5;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  font-weight: 500;

  &:hover {
    opacity: 1;
  }
`

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-left: auto;
`

const SaveButton = styled.button`
  background: #8080ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #7070ee;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const Icon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.textColor || '#666'};
`

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const EmptyStateText = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 500;
`

const EmptyStateSubtext = styled.p`
  margin: 0;
  opacity: 0.7;
  font-size: 0.9rem;
`

const CourseCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
