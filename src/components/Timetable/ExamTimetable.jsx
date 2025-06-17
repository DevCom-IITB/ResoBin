import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Form, toast } from 'components/shared';
import { API } from 'config/api';
import { useQueryString } from 'hooks';


export const filterKeys = [
  'p',
  'semester',
  'department',
  'credits_min',
  'credits_max',
  'halfsem',
  'running',
  'tags',
  'slots',
  'avoid_slots',
  'avoid_slot_clash',
]

const styles = {
  container: {
    padding: '1rem',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#707AFF',
    borderRadius: '12px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '700px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '0.9rem 1.2rem',
    backgroundColor: '#f0f0f0',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    color: '#555',
  },
  td: {
    padding: '0.9rem 1.2rem',
    fontSize: '0.95rem',
    color: '#444',
    textAlign: 'left'
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
  },
  rowHover: {
    transition: 'background-color 0.2s ease-in-out',
  },
  closeButton: {
    backgroundColor: '#FF4C4C',
    color: 'white',
    marginTop: '1rem',
    padding: '5px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  date :{
    fontSize: '0.9rem',
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'left',
  }
};

const Table = ({ timetable }) => {
 const sortedDates = Object.keys(timetable).sort((a, b) => {
  const extractDate = (str) => {
    const datePart = str.split(' ')[1]; // Get "21/04/25"
    const [day, month, year] = datePart.split('/').map(num => parseInt(num, 10));
    return new Date(2000 + year, month - 1, day); // JS needs full year
  };

  return extractDate(a) - extractDate(b);
});

  const slotMap = {
    1: "09:00 - 12:00",
    2: "13:30 - 16:30",
    3: "18:00 - 21:00",
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📚 Mid-semester Examinations</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Day/Date</th>
              <th style={styles.th}>09:00 - 12:00</th>
              <th style={styles.th}>13:30 - 16:30</th>
              <th style={styles.th}>18:00 - 21:00</th>
            </tr>
          </thead>
        </table>

        <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
          <table style={styles.table}>
            <tbody>
              {sortedDates.map((date, idx) => {
                const slotData = timetable[date] || {};

                // Build a row aligned with slotMap
                const rowSlots = {
                  "09:00 - 12:00": slotData[1]?.join(', ') || '',
                  "13:30 - 16:30": slotData[2]?.join(', ') || '',
                  "18:00 - 21:00": slotData[3]?.join(', ') || '',
                };

                return (
                  <tr
                    key={date}
                    style={{
                      ...styles.rowHover,
                      ...(idx % 2 === 1 ? styles.rowEven : {}),
                    }}
                  >
                    <td style={styles.date}>{date}</td>
                    <td style={styles.td}>{rowSlots["09:00 - 12:00"]}</td>
                    <td style={styles.td}>{rowSlots["13:30 - 16:30"]}</td>
                    <td style={styles.td}>{rowSlots["18:00 - 21:00"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const CourseFinderFilterForm = ({ setCoursesAndSlots }) => {
const { deleteQueryString, getQueryString, setQueryString } = useQueryString()
const [form] = Form.useForm()
const [userTimetableCourses, setUserTimetableCourses] = useState([])
const [semesters, setSemesters] = useState({})
const getSemesters = async () => {
  try {
    const response = await API.semesters.list()
    setSemesters(response[0])
    // console.log('Fetched timetable slots: here', response)
  } catch (error) {
    toast({ status: 'error', content: error })
  }
}
useEffect(() => {
  getSemesters()
}, [])
useEffect(() => {
  const fetchUserTimetable = async () => {
    try {
      if (!semesters.season || !semesters.year) {
        setUserTimetableCourses([])
        setCoursesAndSlots([], []);
        return
      }
      const response = await API.profile.timetable.read({
        season: semesters.season,
        year: semesters.year,
      })
      setUserTimetableCourses(response)
      // console.log('User Timetable Courses:', response);
      
          const filtered = response.filter(item => {
          const firstSlot = Array.isArray(item.lectureSlots) && item.lectureSlots.length > 0
            ? item.lectureSlots[0]
            : '';
          // Exclude if firstSlot starts with "L"
          return !(typeof firstSlot === 'string' && firstSlot.startsWith('L'));
                    });

            const courses = filtered.map(item => item.course);
            const slots = filtered.map(item => {
              const firstSlot = Array.isArray(item.lectureSlots) && item.lectureSlots.length > 0
                ? item.lectureSlots[0]
                : '';

              if (!firstSlot) return 0;

              // If first character is a letter, return 0
              if (/^[A-Za-z]/.test(firstSlot)) {
                return 0;
              }

              // If first character is a digit, return that digit as number
              if (/^\d/.test(firstSlot)) {
                return parseInt(firstSlot[0], 10);
              }

              // If no match, return 0
              return 0;
            });
      // console.log('Courses:', courses);
      console.log('All Lecture Slots:', slots);
      setCoursesAndSlots(courses, slots);
    } catch (error) {
      toast({
        status: 'error',
        content: 'Failed to fetch user timetable',
        key: 'timetable-error',
      })
      setUserTimetableCourses([])
      setCoursesAndSlots([], []);
    }
  }
  fetchUserTimetable()
}, [semesters, setCoursesAndSlots])
return null;
}

const PopupExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timetable, setTimetable] = useState({});
  const [courses, setCourses] = useState([]);
  const [slots, setSlots] = useState([]);

  
  const setCoursesAndSlots = React.useCallback((coursesArr, slotsArr) => {
    setCourses(coursesArr);
    setSlots(slotsArr);
  }, []);


  const togglePopup = () => {
    setIsOpen(!isOpen);
  };  


  useEffect(() => {
    if (!isOpen) return;
    if (!courses.length) return;
    const fetchSchedule = async () => {
        if( !courses.length) return;
        console.log(' Selected from URL:', courses);

        const userCourses = courses.map((code) => {
            const slotMatch = code.match(/\d+/);  // extract numeric part like "110"
            const slotNumber = slotMatch ? parseInt(slotMatch[0][0], 10) : undefined;

        return {
          course_code: code,
          ...(slotNumber ? { course_slot_number: slotNumber } : {}),
        };
      });
      

      console.log('Sending to API:', userCourses);

     const responses = await Promise.all(
          userCourses.map((course) => {
          // console.log("Sending request to /api/get-schedule/ with:", course);
          return axios
            .post('http://localhost:8000/api/get-schedule/', course)
            .then((res) => {
              // console.log("Got from backend:", res.data);
              return res.data;
            })
            .catch((err) => {
              // console.error(`Failed to fetch for ${course.course_code}`, err);
              return null;
            });
          })
    );


      // console.log(' API Responses:', responses);

      const temp = {};
      responses
        .filter(Boolean)
        .forEach((schedule) => {
          const {
            day_date: dayDate,
            mapped_slot: mappedSlot,
            course_code: courseCode,
          } = schedule;

          if (!dayDate || !mappedSlot || !courseCode) return;

          if (!temp[dayDate]) {
            temp[dayDate] = { 1: [], 2: [], 3: [] };
          }

          temp[dayDate][mappedSlot].push(courseCode);
        });

      // console.log('🧮 Final Timetable:', temp);

      setTimetable(temp);
    };

    if (isOpen) {
      fetchSchedule();
    }
    fetchSchedule();
  }, [isOpen, courses, slots]);

  return (
    <div className="popup">
      <button
        id="popup-btn"
        className="popup-button"
        type="button"
        onClick={togglePopup}
        style={{
          backgroundColor: '#2563EB',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        Mid Sem
      </button>

      {isOpen && (
        <div
          className="Popup-Window"
          style={{
            backgroundColor: '#1B1728',
            padding: '20px',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          <h2
            style={{
              marginBottom: '10px',
              fontFamily: 'monospace',
              fontSize: '1.5rem',
              textDecoration: 'underline',
            }}
          >
            EXAM TIMETABLE
          </h2>
          <Table timetable={timetable} />
          <CourseFinderFilterForm setCoursesAndSlots={setCoursesAndSlots}/>
          <button
            className="Close-button"
            type="button"
            onClick={togglePopup}
            style={styles.closeButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export const Exam = () => {
  return (
    <div className="Exam">
      <PopupExample />
    </div>
  );
};

export default Exam;
