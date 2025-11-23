import { Download } from '@styled-icons/heroicons-outline'
import React from 'react'
import styled from 'styled-components/macro'

import { toast } from 'components/shared'

const ExamTimetableDownload = ({ timetable }) => {
  // Helper function to convert date string to proper format for ICS
  const parseExamDate = (dateStr) => {
    // dateStr format: "Friday, 21/11/25" or just "21 NOV"
    const months = {
      JAN: '01',
      FEB: '02',
      MAR: '03',
      APR: '04',
      MAY: '05',
      JUN: '06',
      JUL: '07',
      AUG: '08',
      SEP: '09',
      OCT: '10',
      NOV: '11',
      DEC: '12',
    }

    if (dateStr.includes(',')) {
      // Format: "Friday, 21/11/25"
      const datePart = dateStr.split(',')[1].trim()
      const [day, month, year] = datePart.split('/')
      return {
        day: day.padStart(2, '0'),
        month: month.padStart(2, '0'),
        year: `20${year}`,
      }
    }
    // Format: "21 NOV"
    const [day, monthAbbr] = dateStr.split(' ')
    return {
      day: day.padStart(2, '0'),
      month: months[monthAbbr] || '11',
      year: '2025',
    }
  }

  // Generate ICS file for exam timetable
  const generateExamICSFile = () => {
    if (!timetable || Object.keys(timetable).length === 0) {
      toast({
        status: 'warning',
        content: 'No exam schedule to download',
        key: 'exam-download',
      })
      return null
    }

    const timeSlots = {
      1: { start: '09:00', end: '12:00' },
      2: { start: '13:30', end: '16:30' },
      3: { start: '18:00', end: '21:00' },
    }

    const events = []

    Object.entries(timetable).forEach(([dateStr, slotData]) => {
      const dateInfo = parseExamDate(dateStr)

      Object.entries(slotData).forEach(([slotNum, courseCodes]) => {
        const slot = parseInt(slotNum, 10)
        const times = timeSlots[slot]

        if (!times) return

        courseCodes.forEach((courseCode) => {
          // Create start and end datetime
          const startDateTime = new Date(
            `${dateInfo.year}-${dateInfo.month}-${dateInfo.day}T${times.start}:00`
          )
          const endDateTime = new Date(
            `${dateInfo.year}-${dateInfo.month}-${dateInfo.day}T${times.end}:00`
          )

          // Format to ICS datetime format (YYYYMMDDTHHMMSSZ)
          const formatICSDateTime = (date) => {
            return `${date.toISOString().replace(/[.:-]/g, '').slice(0, -4)}Z`
          }

          const event = `BEGIN:VEVENT
UID:${courseCode}-exam-${dateInfo.year}${dateInfo.month}${
            dateInfo.day
          }-${slot}@resobin
DTSTART:${formatICSDateTime(startDateTime)}
DTEND:${formatICSDateTime(endDateTime)}
SUMMARY:${courseCode} - End Semester Exam
DESCRIPTION:End Semester Examination for ${courseCode}
LOCATION:Examination Hall
STATUS:CONFIRMED
END:VEVENT
`
          events.push(event)
        })
      })
    })

    if (events.length === 0) {
      toast({
        status: 'warning',
        content: 'No exam events to export',
        key: 'exam-export',
      })
      return null
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ResoBin//Exam Timetable//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:End Semester Exams
X-WR-TIMEZONE:Asia/Kolkata
${events.join('')}END:VCALENDAR`

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    })
    const url = window.URL.createObjectURL(blob)
    return url
  }

  const handleDownloadExamTimetable = () => {
    const url = generateExamICSFile()
    if (url) {
      const link = document.createElement('a')
      link.href = url
      link.download = 'exam-timetable.ics'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast({
        status: 'success',
        content: 'Exam timetable downloaded successfully!',
        key: 'exam-success',
      })
    }
  }

  return (
    <DownloadButtonContainer>
      <DownloadButton onClick={handleDownloadExamTimetable}>
        <Download size="18" style={{ marginRight: '8px' }} />
        Download Exam Timetable
      </DownloadButton>
    </DownloadButtonContainer>
  )
}

const DownloadButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`

const DownloadButton = styled.button`
  background-color: #6d669e;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #5f58a6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

export default ExamTimetableDownload
