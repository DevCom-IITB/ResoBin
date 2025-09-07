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
import { selectSemesters } from 'store/courseSlice';

const Sidebar = () => {
  const [schedule, setSchedule] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingReminders, setLoadingReminders] = useState(false);
  const [setCourseData] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment());
  const [currentReminderPage, setCurrentReminderPage] = useState(1);
  const [remindersPerPage] = useState(3);
  
  // Get semester list from Redux store
  const semesterList = useSelector(selectSemesters);

  const fetchSchedule = useCallback(async (date) => {
    setLoadingSchedule(true);
    try {
      const currentSemester = semesterList[semesterList.length - 1];

      if (currentSemester) {
        const timetableResponse = await API.profile.timetable.read(currentSemester);
        const timetableData = timetableResponse.data || timetableResponse;

        if (timetableData && timetableData.length > 0) {
          const courseList = timetableData.map((item) => item.course);
          const coursePromises = courseList.map(async (course) => {
            try {
              const response = await API.courses.read({ code: course });
              return response;
            } catch (error) {
              return null;
            }
          });

                     const courseDataArray = await Promise.all(coursePromises);
           const courseDataObj = {};
           courseDataArray.forEach((course) => {
             if (course && course.code) {
               courseDataObj[course.code] = course;
             }
           });
           setCourseData(courseDataObj);


          const selectedDayIndex = date.isoWeekday() - 1; // Convert to 0-based index

          // Process timetable items to create schedule - only for today
          const scheduleItems = [];

                     timetableData.forEach((item) => {
             const course = courseDataObj[item.course];
             // Note: We don't need to return early if course is missing
             // The venue info comes from the timetable item, not the course

            if (item.lectureSlots && Array.isArray(item.lectureSlots)) {
              item.lectureSlots.forEach((slotName) => {
                const slot = slots[slotName];
                if (slot && slot.col - 1 === selectedDayIndex) {
                  const startTime = rows[slot.row.start]?.title || '08:30';
                  const endTime = rows[slot.row.end]?.title || '09:30';
                  
                  // Get venue from timetable item data (like in TimetableContainer.jsx)
                  const venue = item.venue || item.location || item.room || item.building || item.classroom || item.venue_name || 'Venue TBD';

                  const courseCode = item.course;
                  const courseTitle = course.title;

                  
                  scheduleItems.push({
                    id: `${item.id}-${slotName}-lecture`,
                    title: item.course, // Course code
                    type: 'Lecture',
                    startTime,
                    endTime,
                    venue,
                    courseCode,
                    courseTitle,
                    professor: item.professor || 'TBD'
                  });
                }
              });
            }

            if (item.tutorialSlots && Array.isArray(item.tutorialSlots)) {
              item.tutorialSlots.forEach((slotName) => {
                const slot = slots[slotName];
                if (slot && slot.col - 1 === selectedDayIndex) {
                  const startTime = rows[slot.row.start]?.title || '08:30';
                  const endTime = rows[slot.row.end]?.title || '09:30';
                  
                  // Get venue from course data - check multiple possible properties like in example.jsx
                  const venue = course.venue || course.location || course.room || course.building || course.classroom || course.venue_name || 'Venue TBD';

                  const courseCode = item.course;
                  const courseTitle = course.title;

                  
                  scheduleItems.push({
                    id: `${item.id}-${slotName}-tutorial`,
                    title: item.course, // Course code
                    type: 'Tutorial',
                    startTime,
                    endTime,
                    venue,
                    courseCode,
                    courseTitle,
                    professor: item.professor || 'TBD'
                  });
                }
              });
            }
          });

          scheduleItems.sort((a, b) => {
            const timeToMinutes = (timeStr) => {
              const [hours, minutes] = timeStr.split(':').map(Number);
              return hours * 60 + minutes;
            };
            return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
          });

          setSchedule(scheduleItems);
        } else {
          setSchedule([]);
        }
      } else {
        setSchedule([]);
      }
    } catch (error) {
      toast({ status: 'error', content: 'Failed to load schedule', key: 'schedule-error' });
      setSchedule([]);
    } finally {
      setLoadingSchedule(false);
    }
  }, [semesterList]);

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
    fetchSchedule(selectedDate); // Use selectedDate instead of moment()
    fetchReminders();
  }, [fetchSchedule, fetchReminders, selectedDate]);

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
          <TimeLabel>{item.startTime}</TimeLabel>
          <ScheduleContent>
            <ScheduleTitle>{item.title}</ScheduleTitle>
            <ScheduleTimeDetails>
              {`${item.startTime} - ${item.endTime} | ${item.venue}`}
            </ScheduleTimeDetails>
            <ScheduleTag type={item.type}>{item.type}</ScheduleTag>
          </ScheduleContent>
        </ScheduleItem>
      ));
    }
    return <ScheduleEmpty>No courses scheduled for today.</ScheduleEmpty>;
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
            let dueTime = "time";
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
                    {`Due ${reminder.date} | ${dueTime}`}
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