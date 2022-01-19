import { Download } from '@styled-icons/heroicons-outline'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'
import { cols, rows, slots } from 'data/timetable'
import { selectCourseListMinified } from 'store/courseSlice'

const TimetableDownloadLink = ({ coursesInTimetable }) => {
  const courseListMinified = useSelector(selectCourseListMinified)

  const ISOStringToICSDate = (dateString) =>
    `${dateString.replace(/[.:]/g, '').slice(0, -5)}Z`

  const getRecurringEvent = (
    startTime,
    endTime,
    weekdayFirstTwoChars,
    summary,
    description
  ) => {
    const startDate = new Date()
    const endDate = new Date()

    // ? YMD (year month date) info is needed only for setting the time after which recurrence occurs
    // * YMD is set to the date when this function is called
    startDate.setHours(startTime.hours)
    startDate.setMinutes(startTime.minutes)
    endDate.setHours(endTime.hours)
    endDate.setMinutes(endTime.minutes)

    const result = `
      BEGIN:VEVENT
      UID:${summary + startTime.hours + weekdayFirstTwoChars}
      DTSTART:${ISOStringToICSDate(startDate.toISOString())}
      DTEND:${ISOStringToICSDate(endDate.toISOString())}
      RRULE:FREQ=WEEKLY;BYDAY=${weekdayFirstTwoChars}
      SUMMARY:${summary}
      DESCRIPTION:${description}
      END:VEVENT
    `

    return result
  }

  const generateCourseEvents = (data) => {
    const { course, lectureSlots } = data
    const courseTitle = courseListMinified.find(
      (_course) => _course?.code === data.course
    )

    const courseSlots = lectureSlots.map((slot) => ({
      slot,
      grid: slots[slot],
    }))

    const courseEvents = courseSlots.map(({ slot, grid }, idx) => {
      const startTimeHM = rows[grid.row.start].title.split(':')
      const endTimeHM = rows[grid.row.end].title.split(':')
      const weekdayFirstTwoChars = cols[grid.col - 1].title
        .slice(0, 2)
        .toUpperCase()

      return getRecurringEvent(
        { hours: startTimeHM[0], minutes: startTimeHM[1] },
        { hours: endTimeHM[0], minutes: endTimeHM[1] },
        weekdayFirstTwoChars,
        course,
        courseTitle.title
      )
    })

    return courseEvents
  }

  const getAllEvents = () => {
    const nestedArray = coursesInTimetable?.map((data) =>
      generateCourseEvents(data)
    )

    return [].concat(...nestedArray)
  }

  const generateICSFile = (eventList) => {
    const beginning =
      'BEGIN:VCALENDAR\n' +
      'CALSCALE:GREGORIAN\n' +
      'METHOD:PUBLISH\n' +
      'PRODID:-//Test Cal//EN\n' +
      'VERSION:2.0\n'
    const ending = 'END:VCALENDAR'

    const full = beginning + eventList.join('\n') + ending
    const data = new File([full], { type: 'text/plain' })

    return window.URL.createObjectURL(data)
  }

  return (
    <DownloadButtonContainer
      to={generateICSFile(getAllEvents())}
      target="_blank"
      download
    >
      <ButtonIcon
        icon={<Download size="20" />}
        onClick={() => {}}
        tooltip="Download .ics file (which you can import in Google Calendar / ICal )"
        hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
      />
    </DownloadButtonContainer>
  )
}

export default TimetableDownloadLink

const DownloadButtonContainer = styled(Link)`
  position: absolute;
  right: 0;
`
