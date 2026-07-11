// ? function to combine multiple slots
const combineSlots = (...slots) => ({
  col: slots[0].col,
  row: {
    start: slots.map((slot) => slot.row.start).reduce((a, b) => Math.min(a, b)),
    end: slots.map((slot) => slot.row.end).reduce((a, b) => Math.max(a, b)),
  },
})

// ? lecture slots (1 - 1.5 hour)
const lectureSlots = {
  'XE': { col: 1, row: { start: 0, end: 3 } },
  '1A': { col: 1, row: { start: 3, end: 5 } },
  '2A': { col: 1, row: { start: 5, end: 7 } },
  '3A': { col: 1, row: { start: 7, end: 9 } },
  '8A': { col: 1, row: { start: 12, end: 15 } },
  '9A': { col: 1, row: { start: 15, end: 18 } },
  '12A': { col: 1, row: { start: 18, end: 20 } },

  '4A': { col: 2, row: { start: 0, end: 3 } },
  '1B': { col: 2, row: { start: 3, end: 5 } },
  '2B': { col: 2, row: { start: 5, end: 7 } },
  '3B': { col: 2, row: { start: 7, end: 9 } },
  '10A': { col: 2, row: { start: 12, end: 15 } },
  '11A': { col: 2, row: { start: 15, end: 18 } },
  '12B': { col: 2, row: { start: 18, end: 20 } },

  '5A': { col: 3, row: { start: 0, end: 3 } },
  '6A': { col: 3, row: { start: 3, end: 6 } },
  '7A': { col: 3, row: { start: 6, end: 9 } },
  'X1': { col: 3, row: { start: 12, end: 14 } },
  'X2': { col: 3, row: { start: 14, end: 16 } },
  'X3': { col: 3, row: { start: 16, end: 18 } },
  'XC': { col: 3, row: { start: 18, end: 20 } },

  '4B': { col: 4, row: { start: 0, end: 3 } },
  '1C': { col: 4, row: { start: 3, end: 5 } },
  '2C': { col: 4, row: { start: 5, end: 7 } },
  '3C': { col: 4, row: { start: 7, end: 9 } },
  '8B': { col: 4, row: { start: 12, end: 15 } },
  '9B': { col: 4, row: { start: 15, end: 18 } },
  '12C': { col: 4, row: { start: 18, end: 20 } },

  '5B': { col: 5, row: { start: 0, end: 3 } },
  '6B': { col: 5, row: { start: 3, end: 6 } },
  '7B': { col: 5, row: { start: 6, end: 9 } },
  '10B': { col: 5, row: { start: 12, end: 15 } },
  '11B': { col: 5, row: { start: 15, end: 18 } },
  'XD': { col: 5, row: { start: 18, end: 20 } },

  // Unmentioned remaining slots, shifted by +1 to maintain original visual time position
  '4C': { col: 4, row: { start: 3, end: 5 } }, 
  '13A': { col: 1, row: { start: 22, end: 25 } },
  '13B': { col: 4, row: { start: 22, end: 25 } },
  '14A': { col: 2, row: { start: 19, end: 22 } }, 
  '14B': { col: 5, row: { start: 19, end: 22 } },
  '15A': { col: 2, row: { start: 22, end: 25 } },
  '15B': { col: 5, row: { start: 22, end: 25 } },
}

// ? lab slots (3h)
export const labSlots = {
  L1: combineSlots(lectureSlots['8A'], lectureSlots['9A']),
  L2: combineSlots(lectureSlots['10A'], lectureSlots['11A']),

  L3: combineSlots(lectureSlots['8B'], lectureSlots['9B']),
  L4: combineSlots(lectureSlots['10B'], lectureSlots['11B']),

  L5: combineSlots(lectureSlots['6A'], lectureSlots['7A']),
  L6: combineSlots(lectureSlots['6B'], lectureSlots['7B']),
  LX: combineSlots(lectureSlots.X1, lectureSlots.X2, lectureSlots.X3),
}

const slots = {
  ...lectureSlots,
  ...labSlots,
}

export default slots