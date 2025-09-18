import { Bell, ChevronLeft, ChevronRight } from '@styled-icons/heroicons-outline';
import moment from 'moment';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import BellIcon from 'assets/svgs/bell-icon.svg'
import { toast } from 'components/shared';
import EplannerAPI from "components/Timetable/eplannerAPI";
import { API } from 'config/api';
import { slots, rows } from 'data/timetable';
import { hash } from 'helpers'
import {useColorPicker } from 'hooks';
import { selectSemesters } from 'store/courseSlice';


const Sidebar = () => {
  const [schedule, setSchedule] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingReminders, setLoadingReminders] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [currentReminderPage, setCurrentReminderPage] = useState(1);
  const [remindersPerPage] = useState(3);
  const [loading, setLoading] = useState()
  const [semIdx, setSemIdx] = useState(null)
  
  // Get semester list from Redux store
  const semesterList = useSelector(selectSemesters);
  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [coursedata, setCoursedata] = useState({})
  const [eplannerEvents, setEplannerEvents] = useState({
    personal: [],
    exam: [],
    reminder: []
  })

  const colorPicker = useColorPicker()

  // Fetch user timetable
  const fetchUserTimetable = useCallback(async (_semester) => {
    try {
      const response = await API.profile.timetable.read(_semester)
      setCourseTimetableList(response)
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }, [])

  // Fetch eplanner events
  const fetchEplannerEvents = async () => {
    try {
      const [personalData, examData, reminderData] = await Promise.all([
        EplannerAPI.getPersonals().catch(() => []),
        EplannerAPI.getExams().catch(() => []),
        EplannerAPI.getReminders().catch(() => [])
      ])

      setEplannerEvents({
        personal: personalData || [],
        exam: examData || [],
        reminder: reminderData || []
      })
    } catch (error) {
      console.error('Error fetching eplanner events:', error)
    }
  }

  // Fetch course metadata
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const promises = courseTimetableList.map(async (item) => {
          const response = await API.courses.read({ code: item.course })
          return response
        })
        const courseDataArray = await Promise.all(promises)
        const courseDataObj = {}
        courseDataArray.forEach((course) => {
          courseDataObj[course.code] = course
        })
        setCoursedata(courseDataObj)
      } catch (error) {
        toast({ status: 'error', content: error })
      }
    }

    if (courseTimetableList.length) fetchCourseData()
  }, [courseTimetableList])

  // Fetch timetable + events whenever semester changes
  useEffect(() => {
    if (semesterList?.length) {
      fetchUserTimetable(semesterList[semesterList.length - 1])
      fetchEplannerEvents()
    }
  }, [semesterList, fetchUserTimetable])

  // Actual event builder
  const getEventsForView = () => {
      // Helper to get day index from date
      const getDayIndexFromDate = (dateStr) => {
        if (!dateStr) return -1;
        const date = moment(dateStr);
        return date.day() === 0 ? 6 : date.day() - 1; // Convert Sunday=0 to 6, Mon=1 to 0, etc.
      };
      const events = []
  
      courseTimetableList.forEach((item) => {
        const course = coursedata[item.course]
        if (!course) return
  
        // NOTE: This logic assumes your `slots` data maps Monday to `col: 1`, Tuesday to `col: 2`, etc.
        // `dayIndex` will be 0 for Monday, 1 for Tuesday... 6 for Sunday. This is the standard.
        const createEventHandler = (slotName, type) => {
          const slot = slots[slotName]
          if (slot) {
            events.push({
              id: `${item.id}-${slotName}${type === 'Tutorial' ? '-tut' : ''}`,
              courseCode: item.course,
              title: course.title,
              type,
              dayIndex: slot.col - 1, // Assumes Mon=1 -> 0, Tue=2 -> 1, etc.
              startRow: slot.row.start,
              endRow: slot.row.end,
              startTime: rows[slot.row.start]?.title || '08:30',
              endTime: rows[slot.row.end]?.title || '0',
              color: colorPicker(hash(item.id)),
              slotName,
            })
          }
        }
  
        item.lectureSlots.forEach((slotName) =>
          createEventHandler(slotName, 'Lecture')
        )
        item.tutorialSlots.forEach((slotName) =>
          createEventHandler(slotName, 'Tutorial')
        )
      })
  
      // Add eplanner events to the events array
      const addEplannerEvents = () => {
        // Helper to convert time to row index
        const timeToRow = (timeStr) => {
          if (!timeStr) return 0;
          
          // Parse time string
          const [hours, minutes] = timeStr.split(':').map(Number);
          const timeInMinutes = hours * 60 + minutes;
          
          // Time to row mapping based on actual timetable structure (0-based indexing)
          const timeSlots = [
            { time: '08:30', row: 0 }, { time: '09:00', row: 1 }, { time: '09:30', row: 2 },
            { time: '10:00', row: 3 }, { time: '10:30', row: 4 }, { time: '11:00', row: 5 },
            { time: '11:30', row: 6 }, { time: '12:00', row: 7 }, { time: '12:30', row: 8 },
            // Lunch break gap
            { time: '14:00', row: 9 }, { time: '14:30', row: 10 }, { time: '15:00', row: 11 },
            { time: '15:30', row: 12 }, { time: '16:00', row: 13 }, { time: '16:30', row: 14 },
            { time: '17:00', row: 15 },
            // Evening break gap
            { time: '17:30', row: 16 }, { time: '18:00', row: 17 }, { time: '18:30', row: 18 },
            { time: '19:00', row: 19 }, { time: '19:30', row: 20 }, { time: '20:00', row: 21 },
            { time: '20:30', row: 22 }, { time: '21:00', row: 23 }, { time: '21:30', row: 24 },
            { time: '22:00', row: 25 }
          ];
          
          // Convert time slots to minutes for comparison
          const timeSlotsInMinutes = timeSlots.map(slot => {
            const [h, m] = slot.time.split(':').map(Number);
            return { minutes: h * 60 + m, row: slot.row };
          });
          
          // Find exact match first
          const exactMatch = timeSlotsInMinutes.find(slot => slot.minutes === timeInMinutes);
          if (exactMatch) {
            return exactMatch.row;
          }
          
          // Find the closest time slot if no exact match
          let closestSlot = timeSlotsInMinutes[0];
          let minDiff = Math.abs(timeInMinutes - closestSlot.minutes);
          
          for (let i = 1; i < timeSlotsInMinutes.length; i += 1) {
            const diff = Math.abs(timeInMinutes - timeSlotsInMinutes[i].minutes);
            if (diff < minDiff) {
              minDiff = diff;
              closestSlot = timeSlotsInMinutes[i];
            }
          }
          
          return closestSlot.row;
        };
  
        
  
        // Process Personal events
        eplannerEvents.personal.forEach(event => {
          if(!event.date) return;
          const startDate = moment(event.date, 'YYYY-MM-DD');
          const repeatType = event.weekdays;
  
          let repeatCount = 1;
          let step = 1;
          if(repeatType === 'Daily') {
            repeatCount = 30;
            step = 1;
          } else if(repeatType === 'Weekly') {
            repeatCount = 10;
            step = 7;
          }
          for (let i = 0; i < repeatCount; i += 1) {
            const thisDate = startDate.clone().add(i * step, 'days');
            const dayIndex = thisDate.day() === 0 ? 6 : thisDate.day() - 1;
            const eventDateStr = thisDate.format('YYYY-MM-DD');
  
            let startRow;
            let endRow;
            if(event.isAllDay){
              startRow = 0;
              endRow = 2;
            } else {
              startRow = timeToRow(event.starttime);
              endRow = timeToRow(event.endtime) || startRow + 2;
            }
            events.push({
                id: `personal-${event.id}`,
                title: event.title,
                description: event.description,
                type: 'Personal',
                dayIndex,
                startRow,
                endRow,
                startTime: event.starttime || '09:00',
                endTime: event.endtime || '0',
                color: '#4ECDC4',
                slotName: 'Personal',
                date: event.date,
                eventDate: eventDateStr // Store formatted date for comparison
              });
           }
        });
  
        // Process Exam events
        eplannerEvents.exam.forEach(event => {
          if (event.date) {
            const eventDate = moment(event.date);
            const dayIndex = eventDate.day() === 0 ? 6 : eventDate.day() - 1; // Convert Sunday=0 to 6, Mon=1 to 0, etc.
            
            if (dayIndex >= 0) {
              const startRow = timeToRow(event.starttime);
              const endRow = event.endtime ? timeToRow(event.endtime) : startRow + 4;
  
              events.push({
                id: `exam-${event.id}`,
                courseCode: event.courseCode,
                title: event.course || event.title || 'Exam',
                description: event.description,
                type: 'Exam',
                dayIndex,
                startRow,
                endRow,
                startTime: event.starttime || '10:00',
                endTime: event.endtime || '0',
                color: '#FFD93D',
                slotName: 'Exam',
                date: event.date,
                eventDate: eventDate.format('YYYY-MM-DD') // Store formatted date for comparison
              });
            }
          }
        });
  
        // Process Reminder events
        eplannerEvents.reminder.forEach(event => {
          if (!event.date) return;
          const startDate = moment(event.date, 'YYYY-MM-DD');
          const repeatType = event.weekdays;
  
          // How many times to repeat? (30 days for daily, 10 weeks for weekly, 1 for none)
          let repeatCount = 1;
          let step = 1;
          if (repeatType === 'Daily') {
            repeatCount = 30;
            step = 1;
          } else if (repeatType === 'Weekly') {
            repeatCount = 10;
            step = 7;
          }
  
          for (let i = 0; i < repeatCount; i+=1) {
            const thisDate = startDate.clone().add(i * step, 'days');
            const dayIndex = thisDate.day() === 0 ? 6 : thisDate.day() - 1;
            const eventDateStr = thisDate.format('YYYY-MM-DD');
  
            let startRow;
            let endRow;
            if (event.isAllDay) {
              startRow = 0;
              endRow = 2;
            } else {
              startRow = timeToRow(event.starttime);
              endRow = timeToRow(event.endtime) || startRow + 2;
            }
  
            events.push({
              id: `reminder-${event.id}-${eventDateStr}`,
              title: event.title,
              description: event.description,
              type: 'Reminder',
              isAllDay: event.isAllDay,
              dayIndex,
              startRow,
              endRow,
              startTime: event.isAllDay ? 'All Day' : (event.starttime || '09:00'),
              endTime: event.isAllDay ? '' : (event.endtime || '0'),
              color: '#FF6B6B',
              slotName: 'Reminder',
              date: event.date,
              eventDate: eventDateStr
            });
          }
        });
      };
  
      addEplannerEvents();

      console.log("events: ",events)
      return events
    }

  const fetchSchedule = (date) => {
    setLoadingSchedule(true);
    const events = getEventsForView();

    const todayStr = date.format('YYYY-MM-DD');
    const todayDayIndex = date.day() === 0 ? 6 : date.day() - 1;

    const filtered = events.filter(event => {
      if (event.type === "Lecture" || event.type === "Tutorial") {
        return event.dayIndex === todayDayIndex;
      }
      return event.eventDate === todayStr;
    });

    setSchedule(filtered);
    setLoadingSchedule(false);
  };


  const fetchReminders = useCallback(async () => {
    setLoadingReminders(true);
    try{
        const data = await EplannerAPI.getReminders();
        setReminders(data);
    } catch (error) {
      toast({ status: 'error', content: 'Failed to load reminders', key: 'reminders-error' });
      setReminders([]);
    } finally {
      setLoadingReminders(false);
    }
}, []);

  useEffect(() => {
    fetchSchedule(selectedDate);
    fetchReminders();
  }, [selectedDate, fetchReminders]);


  // Reset to first page when reminders change
  useEffect(() => {
    setCurrentReminderPage(1);
  }, [reminders]);

  const handlePrevDay = () => {
    setSelectedDate(selectedDate.clone().subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setSelectedDate(selectedDate.clone().add(1, 'day'));
  };

  // ---- NEW: extracted render functions to avoid nested ternary ----
  const renderSchedule = () => {
    if (loadingSchedule) {
      return <ScheduleLoading>Loading schedule...</ScheduleLoading>;
    }
    if (schedule.length > 0) {
      return schedule.map((item) => (
        <ScheduleItem key={item.id}>
          <TimeLabel>{item.startTime.slice(0,5)}</TimeLabel>
          <ScheduleContent>
            <ScheduleTitle>{item.title}</ScheduleTitle>
           <ScheduleTimeDetails>
             {item.endTime !== '0'
               ? `${item.startTime.slice(0,5)} - ${item.endTime.slice(0,5)}`
               : item.startTime.slice(0,5)}
           </ScheduleTimeDetails>

            <ScheduleTag type={item.type}>{item.type}</ScheduleTag>
          </ScheduleContent>
        </ScheduleItem>
      ));
    }
    return <ScheduleEmpty>Nothing scheduled for today.</ScheduleEmpty>;
  };

  const renderReminders = () => {
    if (loadingReminders) {
      return <ReminderLoading>Loading reminders...</ReminderLoading>;
    }
    if (reminders.length > 0) {
      // Calculate pagination
      const totalPages = Math.ceil(reminders.length / remindersPerPage);
      const startIndex = (currentReminderPage - 1) * remindersPerPage;
      const endIndex = startIndex + remindersPerPage;
      const currentReminders = reminders.slice(startIndex, endIndex);

      return (
        <>
          <RemindersHeader>
            <RemindersTitle>Upcoming Reminders</RemindersTitle>
            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationButton 
                  onClick={() => setCurrentReminderPage(prev => Math.max(1, prev - 1))}
                  disabled={currentReminderPage === 1}
                >
                  &lt;
                </PaginationButton>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationButton
                    key={page}
                    onClick={() => setCurrentReminderPage(page)}
                    active={page === currentReminderPage}
                  >
                    {page}
                  </PaginationButton>
                ))}
                {totalPages > 3 && <PaginationButton disabled>...</PaginationButton>}
                <PaginationButton 
                  onClick={() => setCurrentReminderPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentReminderPage === totalPages}
                >
                  &gt;
                </PaginationButton>
              </PaginationContainer>
            )}
          </RemindersHeader>
          {currentReminders.map((reminder) => {
            let dueDate = reminder.date;
            if(reminder.weekdays === "Daily"){
              if (reminder.date <= moment().format('YYYY-MM-DD') && moment().subtract(30,'day').format('YYYY-MM-DD') < reminder.date){
                dueDate = "Today";
              }else if (reminder.date <= moment().subtract(30,'day').format('YYYY-MM-DD')){
                return null;
              }else{
                dueDate = reminder.date;
              }
            }else if(reminder.weekdays === "Weekly"){
              if (reminder.date <= moment().format('YYYY-MM-DD') && moment().subtract(9,'week').format('YYYY-MM-DD') <= reminder.date){
                dueDate = "This week";
              }else if (reminder.date < moment().subtract(9,'week').format('YYYY-MM-DD')){
                return null;
              }else{
                dueDate = reminder.date;
              }
            }else{
              if (reminder.date === moment().format('YYYY-MM-DD')){
                dueDate = "Today";
              }
              if (reminder.date === moment().add(1, 'day').format('YYYY-MM-DD')){
                dueDate = "Tomorrow";
              }
              if (reminder.date < moment().format('YYYY-MM-DD')){
                return null;
              }
            }
            let dueTime = reminder.starttime;
            if (reminder.isAllDay){
              dueTime = "All Day";
            }
            else{
              dueTime = reminder.starttime.slice(0, 5);
            }
            return (
              <ReminderItem key={reminder.id}>
                <img src={BellIcon} alt="Reminder" width={22} height={22} />
                <ReminderDetails>
                  <ReminderTitle>{reminder.title}</ReminderTitle>
                  <ReminderDue>
                    {`Due ${dueDate} | ${dueTime}`}
                  </ReminderDue>
                </ReminderDetails>
              </ReminderItem>
            );
          })}
        </>
      );
    }
    return <ReminderEmpty>No upcoming reminders.</ReminderEmpty>;
  };

  return (
    <SidebarContainer>
             <DateSelector>
         
         <DateDisplay>{selectedDate.format('dddd, D MMMM YYYY')}</DateDisplay>
         
       </DateSelector>

      <SidebarSectionHeader>
        <LeftItem>
        {selectedDate.isSame(moment(), 'day') ? "Today's Schedule" : `${selectedDate.format('dddd')}'s Schedule`}
        </LeftItem>
        <RightGroup>
        <DateButton onClick={handlePrevDay}>
           <ChevronLeft size="20" />
         </DateButton>
         <DateButton onClick={handleNextDay}>
           <ChevronRight size="20" />
         </DateButton>
         </RightGroup>
      </SidebarSectionHeader>
      
      <ScheduleContainer>{renderSchedule()}</ScheduleContainer>

             <RemindersContainer>{renderReminders()}</RemindersContainer>
    </SidebarContainer>
  );
};

export default Sidebar;

// Sidebar styled components
const SidebarContainer = styled.div`
  padding: 1.5rem;
  background-color: #1a1523;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
`;

const DateDisplay = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #D6C9F8;
  margin-bottom: -1rem;
  margin-left: -1.75rem;
  flex-shrink: 0;
`;

const DateButton = styled.button`
  background: #a18aff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #8c7ae6;
  }
`;

const SidebarSectionHeader = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  display: flex;
  const Item = styled.div
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  justify-content: space-between; /* pushes left group to left, right group to right */
  align-items: center;
  flex-shrink: 0;
`;

const LeftItem = styled.div`
  /* stays at left extreme */
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem; /* fixed spacing between the two right items */
`;

const ScheduleContainer = styled.div`
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  background-color: #231F31;
  flex: 1;
  overflow-y: auto;
  min-height: 310px;
  min-width: 270px;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1a1523;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #4c4664;
    border-radius: 3px;
    
    &:hover {
      background: #6d669e;
    }
  }
  
  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #4c4664 #1a1523;
`;

const ScheduleItem = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  margin-left: 2.5rem;

  /* Aligned dotted line */
  &::before {
    content: '';
    position: absolute;
    left: -2.5rem;
    top: 2rem;
    width: 2px;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      #D6C9F8 0px,
      #D6C9F8 4px,
      transparent 4px,
      transparent 8px
    );
    background-position: 0 0; /* ensures consistent alignment */
  }

  /* Optional: shift start for very first item without breaking alignment */
  &:first-child::before {
    background-position: 0 1.5rem; /* instead of top offset */
  }
`;


const TimeLabel = styled.span`
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  font-size: 1rem;
  color: #D6C9F8;
  background-color:#231F31;
  padding: 0 0.5rem;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const ScheduleContent = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  margin-left: -1rem;
`;

const ScheduleTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-top: 2.5rem;
`;

const ScheduleTimeDetails = styled.div`
  font-size: 0.8rem;
  color: white;
  margin-bottom: 0.25rem;
`;

const ScheduleTag = styled.span`
  display: inline-block;
  background-color: ${({ type }) => {
    switch (type) {
      case 'Lecture':
        return '#4c4664';
      case 'Tutorial':
        return '#644646';
      case 'Personal':
        return '#46644c';
      default:
        return '#3e3e60';
    }
  }};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.7rem;
`;

const RemindersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
  height: 280px; /* Fixed height to show exactly 3 notifications */
  border-radius: 10px;
  padding: 1rem;
  margin-top: -1rem;
`;

const ReminderItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #2b273b;
  border-radius: 8px;
  padding: 0.75rem;
`;

const ReminderDetails = styled.div`
  color: white;
  margin-left: 0.75rem;
`;

const ReminderTitle = styled.div`
  font-weight: 400;
`;

const ReminderDue = styled.div`
  font-size: 0.7rem;
  color: #b0aecd;
`;

const ScheduleLoading = styled.p`
  color: #b0aecd;
  font-style: italic;
`;

const ScheduleEmpty = styled.p`
  color: #b0aecd;
  font-style: italic;
`;

const ReminderLoading = styled.p`
  color: #b0aecd;
  font-style: italic;
`;

const ReminderEmpty = styled.p`
  color: #b0aecd;
  font-style: italic;
`;

const RemindersHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  flex-shrink: 0;
  gap: 0.75rem;
`;

const RemindersTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PaginationButton = styled.button`
  background: ${({ active, disabled }) => {
    if (disabled) return '#1a1523';
    if (active) return '#ffffff';
    return '#2b273b';
  }};
  color: ${({ active, disabled }) => {
    if (disabled) return '#4c4664';
    if (active) return '#1a1523';
    return '#ffffff';
  }};
  border: none;
  border-radius: 4px;
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 0.75rem;
  font-weight: 400;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${({ active }) => (active ? '#f0f0f0' : '#3e3e60')};
  }
`;