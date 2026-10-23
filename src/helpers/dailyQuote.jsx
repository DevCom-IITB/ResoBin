import hash from './hash'

// Returns the date as a stable YYYY-MM-DD string in the user's local time.
const getDateKey = (date = new Date()) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Deterministically picks one quote from `quotes` for the given day and seed.
 *
 * The same (date, seed) pair always maps to the same quote, so the quote
 * stays put for the whole day and changes at midnight. Passing the user's id
 * as the seed makes the choice user-centric, so different users see different
 * quotes on the same day.
 */
export const getDailyQuote = (quotes, seed = '', date = new Date()) => {
  if (!Array.isArray(quotes) || quotes.length === 0) return null
  const index = hash(`${getDateKey(date)}:${seed}`) % quotes.length
  return quotes[index]
}

export default getDailyQuote
