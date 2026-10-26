import moment from 'moment'

import { rows } from 'data/timetable'

import { EXAM_DATE_RANGE, EXAM_TIME_SLOTS } from './examTimetableConfig'

// ? The End Sem popup has always ignored lab slots (they have no exam of their
// ? own) and read the exam slot number off the *first* lecture slot. These
// ? helpers keep that behaviour in one place so the popup and the timetable
// ? views can never disagree about which exams a student has.

export const isLabSlot = (slot) =>
  typeof slot === 'string' && slot.trim().toUpperCase().startsWith('L')

export const getExamSlotNumber = (slot) => {
  const normalized = String(slot ?? '')
    .trim()
    .toUpperCase()

  if (normalized.includes('X')) return 'X'

  // ? Slot names look like "3", "3A", "10B" - the leading digits are the slot
  const match = normalized.match(/^\d+/)
  return match ? parseInt(match[0], 10) : 0
}

/**
 * Turns the courses in the user's timetable into the payload the exam
 * schedule endpoint expects.
 */
export const buildExamCoursePayload = (courseTimetableList = []) =>
  (courseTimetableList || [])
    .filter((item) => item && item.course)
    .filter((item) => {
      const firstSlot = Array.isArray(item.lectureSlots)
        ? item.lectureSlots[0]
        : ''
      return !isLabSlot(firstSlot)
    })
    .map((item) => {
      const firstSlot = Array.isArray(item.lectureSlots)
        ? item.lectureSlots[0]
        : ''
      const slotNumber = getExamSlotNumber(firstSlot)

      return slotNumber
        ? { course_code: item.course, course_slot_number: slotNumber }
        : { course_code: item.course }
    })

/** Unwraps either a bare array or a `{ data: [] }` response envelope. */
export const getScheduleRows = (response) => {
  if (Array.isArray(response)) return response
  if (Array.isArray(response?.data)) return response.data
  return []
}

/**
 * Groups the flat schedule response into
 * { "Friday, 21/11/25": { 1: ["CS101"], 2: ["MA102"], 3: [] } }
 */
export const groupScheduleByDate = (scheduleRows = []) => {
  const grouped = {}
  const createEmptySlots = () =>
    Object.fromEntries(EXAM_TIME_SLOTS.map(({ slot }) => [slot, []]))

  const usableRows = (scheduleRows || []).filter(
    (schedule) => schedule && !schedule.error
  )

  usableRows.forEach((schedule) => {
    const { dayDate, mappedSlot, courseCode } = schedule

    if (!dayDate || !mappedSlot || !courseCode) return

    const isKnownSlot = EXAM_TIME_SLOTS.some(
      ({ slot }) => String(slot) === String(mappedSlot)
    )
    if (!isKnownSlot) return

    if (!grouped[dayDate]) grouped[dayDate] = createEmptySlots()
    grouped[dayDate][mappedSlot].push(courseCode)
  })

  return grouped
}

/** Parses the API's "Friday, 21/11/25" style date strings. */
export const parseExamDate = (dayDate) => {
  const raw = String(dayDate ?? '')
  const afterComma = (raw.split(',')[1] || raw).replace(/\u00A0/g, ' ').trim()

  const formats = ['DD/MM/YY', 'DD/MM/YYYY']
  const parsed = moment(afterComma, formats, true)

  return parsed.isValid() ? parsed : null
}

const timeToRowIndex = (time) => {
  const index = rows.findIndex((row) => row.title === time)
  return index === -1 ? null : index
}

/**
 * Converts the grouped schedule into the same event shape the Day, Week and
 * Month views already render for course events.
 */
export const buildExamScheduleEvents = (groupedSchedule = {}) => {
  const events = []

  Object.entries(groupedSchedule || {}).forEach(([dayDate, slotsForDay]) => {
    const date = parseExamDate(dayDate)
    if (!date) return

    const dateStr = date.format('YYYY-MM-DD')
    const dayIndex = date.isoWeekday() - 1 // Mon=0 ... Sun=6

    Object.entries(slotsForDay || {}).forEach(([slotKey, courseCodes]) => {
      if (!Array.isArray(courseCodes) || !courseCodes.length) return

      const slotConfig = EXAM_TIME_SLOTS.find(
        ({ slot }) => String(slot) === String(slotKey)
      )
      if (!slotConfig) return

      const startRow = timeToRowIndex(slotConfig.startTime)
      const endRow = timeToRowIndex(slotConfig.endTime)
      if (startRow === null || endRow === null) return

      const label = courseCodes.join(', ')

      events.push({
        id: `exam-schedule-${dateStr}-${slotKey}`,
        courseCode: label,
        course: label,
        title: label,
        type: 'Exam',
        isExamSchedule: true,
        dayIndex,
        startRow,
        endRow,
        startTime: slotConfig.startTime,
        endTime: slotConfig.endTime,
        color: '#FF6B35',
        slotName: 'Exam',
        date: dateStr,
        eventDate: dateStr,
      })
    })
  })

  return events
}

/** True while today falls inside the configured exam window. */
export const isWithinExamWindow = (date = moment()) => {
  const start = moment(EXAM_DATE_RANGE.start, 'DD/MM/YY', true)
  const end = moment(EXAM_DATE_RANGE.end, 'DD/MM/YY', true)

  if (!start.isValid() || !end.isValid()) return false

  const day = moment(date).startOf('day')
  return (
    day.isSameOrAfter(start.startOf('day')) &&
    day.isSameOrBefore(end.endOf('day'))
  )
}
