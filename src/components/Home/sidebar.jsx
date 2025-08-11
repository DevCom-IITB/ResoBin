import moment from 'moment';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { toast } from 'components/shared';
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
  
  // Get semester list from Redux store
  const semesterList = useSelector(selectSemesters);

  const fetchSchedule = useCallback(async (date) => {
    setLoadingSchedule(true);
    try {
      // Get current semester from Redux store
      const currentSemester = semesterList[semesterList.length - 1];
      
      if (currentSemester) {
        // Fetch user's timetable for current semester
        const timetableResponse = await API.profile.timetable.read(currentSemester);
        const timetableData = timetableResponse.data || timetableResponse;
        
        if (timetableData && timetableData.length > 0) {
          // First, fetch course data for all courses in timetable
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
          
          // Get the selected day index (Monday = 0, Tuesday = 1, etc.)
          const selectedDayIndex = date.isoWeekday() - 1; // Convert to 0-based index
          
          
          // Process timetable items to create schedule - only for today
          const scheduleItems = [];
          
          timetableData.forEach((item) => {
            const course = courseDataObj[item.course];
            if (!course) return;
            
            // Process lecture slots
            if (item.lectureSlots && Array.isArray(item.lectureSlots)) {
              item.lectureSlots.forEach((slotName) => {
                const slot = slots[slotName];
                if (slot && slot.col - 1 === selectedDayIndex) { // col is 1-based, convert to 0-based
                  const startTime = rows[slot.row.start]?.title || '08:30';
                  const endTime = rows[slot.row.end]?.title || '09:30';
                  
                  scheduleItems.push({
                    id: `${item.id}-${slotName}-lecture`,
                    title: item.course, // Course code
                    type: 'Lecture',
                    startTime,
                    endTime,
                    location: `Slot ${slotName}`,
                    courseCode: item.course,
                    courseTitle: course.title,
                    professor: item.professor || 'TBD'
                  });
                }
              });
            }
            
            // Process tutorial slots
            if (item.tutorialSlots && Array.isArray(item.tutorialSlots)) {
              item.tutorialSlots.forEach((slotName) => {
                const slot = slots[slotName];
                if (slot && slot.col - 1 === selectedDayIndex) { // col is 1-based, convert to 0-based
                  const startTime = rows[slot.row.start]?.title || '08:30';
                  const endTime = rows[slot.row.end]?.title || '09:30';
                  
                  scheduleItems.push({
                    id: `${item.id}-${slotName}-tutorial`,
                    title: item.course, // Course code
                    type: 'Tutorial',
                    startTime,
                    endTime,
                    location: `Slot ${slotName}`,
                    courseCode: item.course,
                    courseTitle: course.title,
                    professor: item.professor || 'TBD'
                  });
                }
              });
            }
          });
          
          // Sort by start time (convert time strings to minutes for comparison)
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
    try {
      // Fetch user's favorites as potential reminders
      const favoritesResponse = await API.profile.favorites();
      const favoritesData = favoritesResponse.data?.results || [];
      
      if (favoritesData.length > 0) {
        // Create reminders based on favorite courses
        const courseReminders = favoritesData.slice(0, 3).map((course, index) => ({
          id: index + 1,
          title: `${course.code} - ${course.title}`,
          dueDate: moment().add(index + 1, 'day').endOf('day'),
          type: 'Course'
        }));
        setReminders(courseReminders);
      } else {
        // Fallback to generic reminders if no favorites
        const genericReminders = [
          { id: 1, title: 'Assignment Deadline', dueDate: moment().add(1, 'day').endOf('day'), type: 'Assignment' },
          { id: 2, title: 'Project Review', dueDate: moment().add(2, 'day').endOf('day'), type: 'Project' },
          { id: 3, title: 'Exam Preparation', dueDate: moment().add(3, 'day').endOf('day'), type: 'Exam' },
        ];
        setReminders(genericReminders);
      }
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
              {`${item.startTime} - ${item.endTime} | ${item.location}`}
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
      return reminders.map((reminder) => (
        <ReminderItem key={reminder.id}>
          <BellIcon>🔔</BellIcon>
          <ReminderDetails>
            <ReminderTitle>{reminder.title}</ReminderTitle>
            <ReminderDue>
              {`due ${moment(reminder.dueDate).calendar().toLowerCase()} | ${moment(reminder.dueDate).format('h:mm A')}`}
            </ReminderDue>
          </ReminderDetails>
        </ReminderItem>
      ));
    }
    return <ReminderEmpty>No upcoming reminders.</ReminderEmpty>;
  };

  return (
    <SidebarContainer>
      <DateSelector>
        <DateButton onClick={handlePrevDay}>{'<'}</DateButton>
        <DateDisplay>{selectedDate.format('dddd, D MMMM YYYY')}</DateDisplay>
        <DateButton onClick={handleNextDay}>{'>'}</DateButton>
      </DateSelector>

      <SidebarSectionHeader>
        {selectedDate.isSame(moment(), 'day') ? "Today's Schedule" : `${selectedDate.format('dddd')}'s Schedule`}
      </SidebarSectionHeader>
      <ScheduleContainer>{renderSchedule()}</ScheduleContainer>

      <SidebarSectionHeader>Upcoming Reminders</SidebarSectionHeader>
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
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2b273b;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
`;

const DateDisplay = styled.div`
  font-weight: 500;
  color: white;
`;

const DateButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
`;

const SidebarSectionHeader = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
`;

const ScheduleContainer = styled.div`
  border-left: 2px dashed #3e3e60;
  padding-left: 2rem;
  margin-bottom: 2rem;
`;

const ScheduleItem = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const TimeLabel = styled.div`
  position: absolute;
  left: -1.5rem;
  top: -0.5rem;
  font-size: 0.8rem;
  color: #b0aecd;
  width: 1.5rem;
  text-align: right;
`;

const ScheduleContent = styled.div`
  padding: 0.5rem 0;
`;

const ScheduleTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: white;
`;

const ScheduleTimeDetails = styled.div`
  font-size: 0.8rem;
  color: #b0aecd;
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
`;

const ReminderItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #2b273b;
  border-radius: 8px;
  padding: 0.75rem;
`;

const BellIcon = styled.div`
  font-size: 1.2rem;
  margin-right: 1rem;
`;

const ReminderDetails = styled.div`
  color: white;
`;

const ReminderTitle = styled.div`
  font-weight: 500;
`;

const ReminderDue = styled.div`
  font-size: 0.8rem;
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