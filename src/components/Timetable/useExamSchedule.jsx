import { useCallback, useEffect, useMemo, useState } from 'react'

import { API } from 'config/api'

import {
  buildExamCoursePayload,
  buildExamScheduleEvents,
  getScheduleRows,
  groupScheduleByDate,
} from './examScheduleUtils'

const RETRY_DELAY = 2000

/**
 * Fetches the end-semester exam schedule for the courses currently in the
 * user's timetable.
 *
 * This is the same endpoint the "End Sem" button uses, so the Day/Week/Month
 * views and that popup always show the same exams - the views simply consume
 * the result as calendar events.
 */
const useExamSchedule = (courseTimetableList, { enabled = true } = {}) => {
  const [scheduleMap, setScheduleMap] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const coursePayload = useMemo(
    () => buildExamCoursePayload(courseTimetableList),
    [courseTimetableList]
  )

  const fetchSchedule = useCallback(
    async (isRetry = false) => {
      if (!coursePayload.length) {
        setScheduleMap({})
        setError(null)
        return
      }

      setLoading(true)

      try {
        const response = await API.examSchedule.getBatch({
          courses: coursePayload,
        })
        setScheduleMap(groupScheduleByDate(getScheduleRows(response)))
        setError(null)
      } catch (err) {
        // ? The schedule endpoint rate limits aggressive callers - retry once
        if (err?.response?.status === 429 && !isRetry) {
          setTimeout(() => fetchSchedule(true), RETRY_DELAY)
          return
        }

        setScheduleMap({})
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    [coursePayload]
  )

  useEffect(() => {
    if (!enabled) return
    fetchSchedule()
  }, [enabled, fetchSchedule])

  const events = useMemo(
    () => buildExamScheduleEvents(scheduleMap),
    [scheduleMap]
  )

  const refetch = useCallback(() => fetchSchedule(), [fetchSchedule])

  return { scheduleMap, events, loading, error, refetch }
}

export default useExamSchedule
