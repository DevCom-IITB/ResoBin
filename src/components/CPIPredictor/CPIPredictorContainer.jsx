import axios from 'axios'
import { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'


import {
  PageHeading,
  PageTitle,
  toast,
} from 'components/shared'
import { API } from 'config/api'
import {
  // selectCourseAPILoading,
  selectSemesters,
} from 'store/courseSlice'

import CourseListComponent from './CourseList'


const CPIPredictorContainer = () => {

  const semesterList = useSelector(selectSemesters)
  // const courseAPILoading = useSelector(selectCourseAPILoading)

  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [courseData, setCourseData] = useState([]);
  // const [loading, setLoading] = useState(courseAPILoading)
  const [semIdx, setSemIdx] = useState(null)
  // const [loadingg, setLoadingg] = useState(true)
   
 
  useEffect(() => {
    const fetchCourseDetails = async (course) => {
      const code = course.course;
      const params = {
        search_fields: 'code',
        q: code,
      };
    
      try {
        // Create a new cancel token for this request
        const source = axios.CancelToken.source();
    
        const response = await API.courses.list({
          params,
          cancelToken: source.token,
        });
        return response.results;
      } catch (error) {
        toast({ status: 'error', content: error.message });
        return null;
      }
    };
    
    
    const fetchAllCourses = async () => {
      // setLoadingg(true);
  
      try {
        const courseDetailsPromises = [];

        courseTimetableList.forEach(course => {
            courseDetailsPromises.push(fetchCourseDetails(course));
        });

        const courseDetails = await Promise.all(courseDetailsPromises);
        // courseDetails is an array of results for each course
        setCourseData(courseDetails); // Filter out null results
      } catch (error) {
        toast({ status: 'error', content: error })
       }  
    };
  
    if (courseTimetableList.length > 0) {
      fetchAllCourses();
    }
  }, [courseTimetableList]);
  

  
  useEffect(() => {
    if (semesterList.length) setSemIdx(semesterList.length - 1)
  }, [semesterList])

  useEffect(() => {
    const fetchUserTimetable = async (_semester) => {
      try {
        // setLoading(true)
        const response = await API.profile.timetable.read(_semester)
        setCourseTimetableList(response)
      } catch (error) {
        toast({ status: 'error', content: error })
       } 
    }

    if (semIdx !== null)  fetchUserTimetable(semesterList[semIdx])
    // else setLoading(true)
  }, [semesterList, semIdx])


  return (
    <>
      <PageHeading>
        <PageTitle>CPI Predictor</PageTitle>
      </PageHeading>

<CourseListComponent courseDetails={courseData} />

</>
    
  )
}
export default CPIPredictorContainer
