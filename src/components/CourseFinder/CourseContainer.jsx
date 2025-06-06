import axios from 'axios'
import { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'

import { Aside, toast } from 'components/shared'
import { API } from 'config/api'
import { slots as slotGrid } from 'data/timetable'
import { useQueryString } from 'hooks'

import CourseList from './CourseList';
import CourseSearch from './CourseSearch';
import { ClearAll } from './Filter/CourseFinderFilterContainer';
import CourseFinderFilterForm, { filterKeys } from './Filter/CourseFinderFilterForm';

let ajaxRequest = null;

const CourseFinderContainer = () => {
  const { getQueryString, deleteQueryString } = useQueryString()
  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(true)
  const [seed, setSeed] = useState(1)
  const [userTimetableCourses, setUserTimetableCourses] = useState([]) // <-- NEW

  // Fetch user's timetable courses (with slots) on mount
  useEffect(() => {
    const fetchUserTimetable = async () => {
      try {
        const response = await API.profile.timetable.read()
        // console.log('Timetable API raw response:', response, typeof response)
        setUserTimetableCourses(response)
        // console.log('Fetched user timetable courses:', response)
        if (!response || !Array.isArray(response) || response.length === 0) {
          // console.warn(
          //   'API.profile.timetable.read returned empty or invalid:',
          //   response
          // )
        }
      } catch (error) {
        toast({ status: 'error', content: 'Failed to fetch user timetable' })
        setUserTimetableCourses([])
        // console.error('Error fetching user timetable:', error)
      }
    }
    fetchUserTimetable()
  }, [])

  // Helper: Get all slots from user's timetable courses
  const getUserTimetableSlots = () => {
    if (!userTimetableCourses?.length) {
      // console.warn(
      //   'userTimetableCourses is empty or undefined:',
      //   userTimetableCourses
      // )
      return []
    }
    const slots = userTimetableCourses.flatMap((item, idx) => {
      // console.log(`Timetable course #${idx}:`, item)
      return [
        ...(item.lectureSlots || []),
        ...(item.tutorialSlots || []),
      ]
    })
    // console.log('User Timetable Slots:', slots)
    return slots
  }

  // Helper: Check if two slots clash using slotGrid info
  const slotsClash = (slotA, slotB) => {
    const a = slotGrid[slotA]
    const b = slotGrid[slotB]
    if (!a || !b) {
      // console.log(`Slot missing in slotGrid: ${slotA} or ${slotB}`, a, b)
      return false
    }
    // Same day (col), overlapping time (row)
    const clash =
      a.col === b.col &&
      a.row.start < b.row.end &&
      b.row.start < a.row.end
    if (clash) {
      // console.log(`Clash detected between slots: ${slotA} and ${slotB}`)
    }
    return clash
  }

  // Helper: Check if a course clashes with user's timetable
  const courseClashesWithTimetable = (course, userSlots) => {
    const courseSlots = [
      ...(course.lectureSlots || []),
      ...(course.tutorialSlots || []),
    ]
    // console.log(
    //   `Checking course ${course.code} for slot clash. Course slots:`,
    //   courseSlots
    // )
    const result = courseSlots.some((cs) =>
      userSlots.some((us) => slotsClash(cs, us))
    )
    if (result) {
      // console.log(
      //   `Course ${course.code} clashes with user's timetable. Course slots:`,
      //   courseSlots,
      //   'User slots:',
      //   userSlots
      // )
    }
    return result
  }

  const fetchCourses = async (params) => {
    setLoading(true)

    try {
      if (ajaxRequest) ajaxRequest.cancel()
      ajaxRequest = axios.CancelToken.source()

      const response = await API.courses.list({
        params,
        cancelToken: ajaxRequest.token,
      })

      // Apply slot clash filter if enabled
      let filteredResults = response.results
      const slotClashFilter = getQueryString('slotclash') === 'true'
      // console.log('Slot Clash Filter Enabled:', slotClashFilter)
      // console.log('userTimetableCourses:', userTimetableCourses)
      if (slotClashFilter && userTimetableCourses?.length) {
        const userSlots = getUserTimetableSlots()
        filteredResults = filteredResults.filter(
          (course) => !courseClashesWithTimetable(course, userSlots)
        )
        // console.log(
        //   'Filtered Results after slot clash:',
        //   filteredResults.map((c) => c.code)
        // )
      } else {
        // console.log('Slot clash filter not applied or no user timetable.')
      }

      setCourseData({ ...response, results: filteredResults })
    } catch (error) {
      if (axios.isCancel(error)) return
      toast({ status: 'error', content: error })
      // console.error('Error fetching courses:', error)
    }

    setLoading(false)
  }

  useEffect(() => {
    const filter = getQueryString();
    const q = /^[A-Za-z]{2,3} [0-9]+$/.test(filter.q) ? filter.q.replace(' ', '') : filter.q;
    const params = {
      search_fields: 'code,title,description',
      q,
      ...filterKeys.reduce(
        (accumulator, value) => ({ ...accumulator, [value]: filter[value] }),
        {}
      ),
    }

    // console.log('Fetching courses with params:', params)
    fetchCourses(params)
  }, [getQueryString, userTimetableCourses])

  return (
    <>
      <CourseSearch loading={loading} setLoading={setLoading} />
      <CourseList
        title="Courses"
        count={courseData.count}
        courseList={courseData.results}
        loading={loading}
        setLoading={setLoading}
      />
      <Aside
        title="Filter"
        subtitle={
          <ClearAll
            onClick={() => {
              deleteQueryString(...filterKeys);
              setSeed(seed + 1);
            }}
          >
            Reset all
          </ClearAll>
        }
        loading={loading}
      >
        <CourseFinderFilterForm setLoading={setLoading} key={seed} />
      </Aside>
    </>
  );
};

export default CourseFinderContainer;