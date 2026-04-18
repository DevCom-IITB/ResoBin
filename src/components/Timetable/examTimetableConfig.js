export const EXAM_DATE_RANGE =[ {
  start: '2026-04-20',
  end: '2026-05-01',
}]

export const EXAM_LABEL = 'End-semester Examinations'
export const EXAM_CALENDAR_NAME = 'End Semester Exams'
export const EXAM_EVENT_LABEL = 'End Semester Exam'

export const EXAM_TIME_SLOTS = [
  {
    label: '08:00 AM - 11:00 AM',
    slot: 1,
    startTime: '08:00',
    endTime: '11:00',
  },
  {
    label: '01:00 PM - 04:00 PM',
    slot: 2,
    startTime: '13:00',
    endTime: '16:00',
  },
  {
    label: '05:30 PM - 08:30 PM',
    slot: 3,
    startTime: '17:30',
    endTime: '20:30',
  },
]
export const isExamPeriod = () => {
  const today = new Date()
  return EXAM_DATE_RANGE.some(({ start, end }) => {
    const s = new Date(start)
    const e = new Date(end)
    e.setHours(23, 59, 59) // include the end day fully
    return today >= s && today <= e
  })
}