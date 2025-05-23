import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Aside, toast } from 'components/shared';
import { API } from 'config/api';
import { slots } from 'data/timetable';
import { useQueryString } from 'hooks';
import { selectAllTimetable } from 'store/userSlice';

import CourseList from './CourseList';
import CourseSearch from './CourseSearch';
import { ClearAll } from './Filter/CourseFinderFilterContainer';
import CourseFinderFilterForm, { filterKeys } from './Filter/CourseFinderFilterForm';

let ajaxRequest = null;

const CourseFinderContainer = () => {
  const { getQueryString, deleteQueryString } = useQueryString();
  const timetableCourseCodes = useSelector(selectAllTimetable);
  const [courseData, setCourseData] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [seed, setSeed] = useState(1);
  const [timetableCourses, setTimetableCourses] = useState({}); // Store full timetable course details

  // Fetch full details of courses in the timetable
  useEffect(() => {
    // console.log("Timetable Course Codes:", timetableCourseCodes);
    const fetchTimetableDetails = async () => {
      if (timetableCourseCodes && timetableCourseCodes.length > 0) {
        const details = {};
        const promises = timetableCourseCodes.map(async (code) => {
          try {
            const response = await API.courses.read({ code });
            if (response) {
              details[code] = response;
            }
          } catch (error) {
            // console.error(`Error fetching details for timetable course ${code}:`, error);
            toast({ status: 'error', content: `Failed to fetch details for ${code}` });
          }
        });
        await Promise.all(promises);
        setTimetableCourses(details);
      } else {
        setTimetableCourses({});
      }
    };

    fetchTimetableDetails();
  }, [timetableCourseCodes]);

  // Extract all slots (lecture, tutorial, lab) from a course
  const getCourseSlots = useCallback((course) => {
    if (!course?.semester || !Array.isArray(course.semester)) return [];
    const allSlots = [];
    course.semester.forEach((sem) => {
      if (!sem.timetable || !Array.isArray(sem.timetable)) return;
      sem.timetable.forEach((entry) => {
        allSlots.push(...(entry.lectureSlots || []), ...(entry.tutorialSlots || []), ...(entry.labSlots || []));
      });
    });
    return allSlots;
  }, []);

  // Check if a given course clashes with the current timetable
  const doesCourseClash = useCallback(
    (potentialCourse) => {
      if (!getQueryString().slotclash === 'true' || Object.keys(timetableCourses).length === 0 || !potentialCourse?.semester) {
        return false;
      }

      const potentialCourseSlots = getCourseSlots(potentialCourse);

      return Object.keys(timetableCourses).some((timetableCourseCode) => {
        const timetableCourse = timetableCourses[timetableCourseCode];
        const timetableCourseSlots = getCourseSlots(timetableCourse);

        return potentialCourseSlots.some((potentialSlot) => {
          const potentialGrid = slots[potentialSlot];
          if (potentialGrid) {
            return timetableCourseSlots.some((timetableSlot) => {
              const timetableGrid = slots[timetableSlot];
              return (
                timetableGrid &&
                potentialGrid.col === timetableGrid.col &&
                potentialGrid.row.end > timetableGrid.row.start &&
                timetableGrid.row.end > potentialGrid.row.start
              );
            });
          }
          return false;
        });
      });
    },
    [getQueryString, timetableCourses, getCourseSlots]
  );

  const fetchCourses = useCallback(
    async (params) => {
      setLoading(true);

      try {
        if (ajaxRequest) ajaxRequest.cancel();
        ajaxRequest = axios.CancelToken.source();

        const response = await API.courses.list({
          params,
          cancelToken: ajaxRequest.token,
        });

        let filteredResults = response?.results || [];

        if (getQueryString().slotclash === 'true') {
          filteredResults = filteredResults.filter((course) => !doesCourseClash(course));
        }

        setCourseData({ ...response, results: filteredResults });
      } catch (error) {
        if (axios.isCancel(error)) return;
        toast({ status: 'error', content: error.message || error.toString() });
      } finally {
        setLoading(false);
      }
    },
    [getQueryString, doesCourseClash]
  );

  useEffect(() => {
    const filter = getQueryString();
    const q = /^[A-Za-z]{2,3} [0-9]+$/.test(filter.q) ? filter.q.replace(' ', '') : filter.q;
    const params = {
      search_fields: 'code,title,description',
      q,
      ...filterKeys.reduce((acc, key) => ({ ...acc, [key]: filter[key] }), {}),
    };

    fetchCourses(params);
  }, [getQueryString, fetchCourses]);

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