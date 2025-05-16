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
    '1A': { col: 1, row: { start: 0, end: 2 } },
    '1B': { col: 2, row: { start: 2, end: 4 } },
    '1C': { col: 4, row: { start: 4, end: 6 } },
  
    '2A': { col: 1, row: { start: 2, end: 4 } },
    '2B': { col: 2, row: { start: 4, end: 6 } },
    '2C': { col: 4, row: { start: 6, end: 8 } },
  
    '3A': { col: 1, row: { start: 4, end: 6 } },
    '3B': { col: 2, row: { start: 6, end: 8 } },
    '3C': { col: 4, row: { start: 0, end: 2 } },
  
    '4A': { col: 1, row: { start: 6, end: 8 } },
    '4B': { col: 2, row: { start: 0, end: 2 } },
    '4C': { col: 4, row: { start: 2, end: 4 } },
  
    '5A': { col: 3, row: { start: 2, end: 5 } },
    '5B': { col: 5, row: { start: 2, end: 5 } },
  
    '6A': { col: 3, row: { start: 5, end: 8 } },
    '6B': { col: 5, row: { start: 5, end: 8 } },
  
    '7A': { col: 3, row: { start: 0, end: 2 } },
    '7B': { col: 5, row: { start: 0, end: 2 } },
  
    '8A': { col: 1, row: { start: 9, end: 12 } },
    '8B': { col: 4, row: { start: 9, end: 12 } },
  
    '9A': { col: 1, row: { start: 12, end: 15 } },
    '9B': { col: 4, row: { start: 12, end: 15 } },
  
    '10A': { col: 2, row: { start: 9, end: 12 } },
    '10B': { col: 5, row: { start: 9, end: 12 } },
  
    '11A': { col: 2, row: { start: 12, end: 15 } },
    '11B': { col: 5, row: { start: 12, end: 15 } },
  
    '12A': { col: 1, row: { start: 16, end: 19 } },
    '12B': { col: 4, row: { start: 16, end: 19 } },
  
    '13A': { col: 1, row: { start: 19, end: 22 } },
    '13B': { col: 4, row: { start: 19, end: 22 } },
  
    '14A': { col: 2, row: { start: 16, end: 19 } },
    '14B': { col: 5, row: { start: 16, end: 19 } },
  
    '15A': { col: 2, row: { start: 19, end: 22 } },
    '15B': { col: 5, row: { start: 19, end: 22 } },
  
    X1: { col: 3, row: { start: 9, end: 11 } },
    X2: { col: 3, row: { start: 11, end: 13 } },
    X3: { col: 3, row: { start: 13, end: 15 } },
    XC: { col: 3, row: { start: 16, end: 19 } },
    XD: { col: 3, row: { start: 19, end: 22 } },
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
  
  const slots = {
    ...lectureSlots,
    ...labSlots,
  }
  
  export default slots