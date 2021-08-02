export const tracks = [
  { id: '1', title: 'Monday' },
  { id: '2', title: 'Tuesday' },
  { id: '3', title: 'Wednesday' },
  { id: '4', title: 'Thursday' },
  { id: '5', title: 'Friday' },
]

export const rows = [
  { id: 'time-0830', title: '08:30 am' },
  { id: 'time-0900', title: '09:00 am' },
  { id: 'time-0930', title: '09:30 am' },
  { id: 'time-1000', title: '10:00 am' },
  { id: 'time-1030', title: '10:30 am' },
  { id: 'time-1100', title: '11:00 am' },
  { id: 'time-1130', title: '11:30 am' },
  { id: 'time-1200', title: '12:00 pm' },
  { id: 'time-1230', title: '12:30 pm' },
  // * Lunch break
  { id: 'time-1400', title: '14:00 pm' },
  { id: 'time-1430', title: '14:30 pm' },
  { id: 'time-1500', title: '15:00 pm' },
  { id: 'time-1530', title: '15:30 pm' },
  { id: 'time-1600', title: '16:00 pm' },
  { id: 'time-1630', title: '16:30 pm' },
  { id: 'time-1700', title: '17:00 pm' },
  // * Evening break
  { id: 'time-1730', title: '17:30 pm' },
  { id: 'time-1800', title: '18:00 pm' },
  { id: 'time-1830', title: '18:30 pm' },
  { id: 'time-1900', title: '19:00 pm' },
  { id: 'time-1930', title: '19:30 pm' },
  { id: 'time-2000', title: '20:00 pm' },
  { id: 'time-2030', title: '20:30 pm' },
]

// ? function to combine multiple slots
const combineSlots = (...slots) => ({
  track: slots[0].track,
  row: {
    start: slots.map((slot) => slot.row.start).reduce((a, b) => Math.min(a, b)),
    end: slots.map((slot) => slot.row.end).reduce((a, b) => Math.max(a, b)),
  },
})

// ? lecture slots (1 - 1.5 hour)
const lectureSlots = {
  '1A': { track: 1, row: { start: 0, end: 2 } },
  '1B': { track: 2, row: { start: 2, end: 4 } },
  '1C': { track: 4, row: { start: 4, end: 6 } },

  '2A': { track: 1, row: { start: 2, end: 4 } },
  '2B': { track: 2, row: { start: 4, end: 6 } },
  '2C': { track: 4, row: { start: 6, end: 8 } },

  '3A': { track: 1, row: { start: 4, end: 6 } },
  '3B': { track: 2, row: { start: 6, end: 8 } },
  '3C': { track: 4, row: { start: 0, end: 2 } },

  '4A': { track: 1, row: { start: 6, end: 8 } },
  '4B': { track: 2, row: { start: 0, end: 2 } },
  '4C': { track: 4, row: { start: 2, end: 4 } },

  '5A': { track: 3, row: { start: 2, end: 5 } },
  '5B': { track: 5, row: { start: 2, end: 5 } },

  '6A': { track: 3, row: { start: 5, end: 8 } },
  '6B': { track: 5, row: { start: 5, end: 8 } },

  '7A': { track: 3, row: { start: 0, end: 2 } },
  '7B': { track: 5, row: { start: 0, end: 2 } },

  '8A': { track: 1, row: { start: 9, end: 12 } },
  '8B': { track: 4, row: { start: 9, end: 12 } },

  '9A': { track: 1, row: { start: 12, end: 15 } },
  '9B': { track: 4, row: { start: 12, end: 15 } },

  '10A': { track: 2, row: { start: 9, end: 12 } },
  '10B': { track: 5, row: { start: 9, end: 12 } },

  '11A': { track: 2, row: { start: 12, end: 15 } },
  '11B': { track: 5, row: { start: 12, end: 15 } },

  '12A': { track: 1, row: { start: 16, end: 19 } },
  '12B': { track: 4, row: { start: 16, end: 19 } },

  '13A': { track: 1, row: { start: 19, end: 22 } },
  '13B': { track: 4, row: { start: 19, end: 22 } },

  '14A': { track: 2, row: { start: 16, end: 19 } },
  '14B': { track: 5, row: { start: 16, end: 19 } },

  '15A': { track: 2, row: { start: 19, end: 22 } },
  '15B': { track: 5, row: { start: 19, end: 22 } },

  X1: { track: 3, row: { start: 9, end: 11 } },
  X2: { track: 3, row: { start: 11, end: 13 } },
  X3: { track: 3, row: { start: 13, end: 15 } },
  XC: { track: 3, row: { start: 16, end: 19 } },
  XD: { track: 3, row: { start: 19, end: 22 } },
}

// ? lab slots (3h)
export const labSlots = {
  L1: combineSlots(lectureSlots['8A'], lectureSlots['9A']),
  L2: combineSlots(lectureSlots['10A'], lectureSlots['11A']),

  L3: combineSlots(lectureSlots['8B'], lectureSlots['9B']),
  L4: combineSlots(lectureSlots['10B'], lectureSlots['11B']),

  L5: combineSlots(lectureSlots['5A'], lectureSlots['6A']),
  L6: combineSlots(lectureSlots['5B'], lectureSlots['6B']),
  LX: combineSlots(lectureSlots.X1, lectureSlots.X2, lectureSlots.X3),
}

export const slots = {
  ...lectureSlots,
  ...labSlots,
}
