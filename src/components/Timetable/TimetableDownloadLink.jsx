import { Download } from '@styled-icons/heroicons-outline'
import { Dropdown, Menu } from 'antd'
import html2canvas from 'html2canvas'
import { useSelector } from 'react-redux'

import { ButtonIcon } from 'components/shared'
import { cols, rows, slots } from 'data/timetable'
import { selectCourseListMinified } from 'store/courseSlice'

const TimetableDownloadLink = ({ coursesInTimetable }) => {
  const courseListMinified = useSelector(selectCourseListMinified)

  const ISOStringToICSDate = (dateString) => {
    return `${dateString.replace(/[.:-]/g, '').slice(0, -4)}Z`
  }

  const getRecurringEvent = (
    startTime,
    endTime,
    weekdayFirstTwoChars,
    summary,
    description,
    location
  ) => {
    const startDate = new Date()
    const endDate = new Date()

    // ? YMD (year month date) info is needed only for setting the time after which recurrence occurs
    // * YMD is set to the date when this function is called
    startDate.setHours(startTime.hours)
    startDate.setMinutes(startTime.minutes)
    endDate.setHours(endTime.hours)
    endDate.setMinutes(endTime.minutes)

    const result = `BEGIN:VEVENT
UID:${summary + startTime.hours + weekdayFirstTwoChars}
DTSTART:${ISOStringToICSDate(startDate.toISOString())}
DTEND:${ISOStringToICSDate(endDate.toISOString())}
RRULE:FREQ=WEEKLY;BYDAY=${weekdayFirstTwoChars}
SUMMARY:${summary}
LOCATION:${location}
DESCRIPTION:${description}
END:VEVENT
`

    return result
  }

  const generateCourseEvents = (data) => {
    const { course, lectureSlots, tutorialSlots, lectureVenue } = data
    const courseTitle = courseListMinified.find(
      (_course) => _course?.code === data.course
    )

    const courseSlots = lectureSlots.map((slot) => ({
      slot,
      grid: slots[slot],
    }))
    const tutSlots = tutorialSlots.map((slot) => ({
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
        courseTitle.title,
        lectureVenue
      )
    })
    const tutEvents = tutSlots.map(({ slot, grid }, idx) => {
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
        courseTitle.title,
        ''
      )
    })
    // console.log(courseEvents.concat(tutEvents))
    return courseEvents.concat(tutEvents)
  }

  const getAllEvents = () => {
    const nestedArray = coursesInTimetable?.map((data) =>
      generateCourseEvents(data)
    )

    return [].concat(...nestedArray)
  }

  const generateICSFile = (eventList) => {
    const data = `BEGIN:VCALENDAR
CALSCALE:GREGORIAN
METHOD:PUBLISH
PRODID:-//Test Cal//EN
VERSION:2.0
${eventList.join('')}
END:VCALENDAR
`

    const file = new File([data], 'semestertimetable.ics', {
      type: 'text/calendar;charset=utf8',
    })

    return window.URL.createObjectURL(file)
  }

  const switchToWeekView = () => {
    const radioGroup = document.querySelector('[class*="StyledRadioGroup"]')
    if (!radioGroup) return Promise.resolve()

    const inputs = Array.from(
      radioGroup.querySelectorAll('input[type="radio"]')
    )
    const weekInput = inputs.find(
      (input) => input instanceof HTMLInputElement && input.value === 'Week'
    )
    if (!weekInput || !(weekInput instanceof HTMLInputElement)) {
      return Promise.resolve()
    }

    if (weekInput.checked) return Promise.resolve()

    const weekButton = weekInput.closest('label') || weekInput.parentElement
    if (weekButton && weekButton instanceof HTMLElement) {
      weekButton.click()
    } else if (weekInput instanceof HTMLElement) {
      weekInput.click()
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  const generatePNGFile = async () => {
    await switchToWeekView()

    const weekViewContainer = document.getElementById('week-view-container')
    if (!weekViewContainer) {
      throw new Error('Weekly view not found')
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 100)
    })

    const container = weekViewContainer.cloneNode(true)
    if (!(container instanceof HTMLElement)) {
      throw new Error('Failed to clone timetable element')
    }

    const computedStyle = window.getComputedStyle(weekViewContainer)
    const { scrollWidth, scrollHeight } = weekViewContainer
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.top = '0'
    container.style.width = `${scrollWidth}px`
    container.style.height = `${scrollHeight}px`
    container.style.background = computedStyle.background
    container.style.backgroundColor = computedStyle.backgroundColor
    document.body.appendChild(container)

    try {
      const canvas = await html2canvas(container, {
        backgroundColor: computedStyle.backgroundColor || null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
        width: scrollWidth,
        height: scrollHeight,
      })

      await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create image blob'))
            return
          }
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'TimeTable.png'
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          setTimeout(() => {
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
            resolve('Download started')
          }, 100)
        }, 'image/png')
      })
    } finally {
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }
  }

  const menu = (
    <Menu theme="dark">
      <Menu.Item key="ics">
        <a
          href={generateICSFile(getAllEvents())}
          target="_blank"
          rel="noreferrer"
          download
          style={{ textDecoration: 'none' }}
        >
          Google Calendar (.ics file)
        </a>
      </Menu.Item>
      <Menu.Item key="png" onClick={() => generatePNGFile()}>
        Image (.png file)
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <ButtonIcon
        icon={<Download size="22" />}
        onClick={() => {}}
        tooltip="Download timetable"
        hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
      />
    </Dropdown>
  )
}

export default TimetableDownloadLink
