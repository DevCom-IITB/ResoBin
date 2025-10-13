import React, { useState, useEffect } from 'react'

import { toast } from 'components/shared'
import { API } from 'config/api'

import EplannerAPI from './eplannerAPI'

const styles = {
  crd: {
    border: '1px',
    margin: '10px 5px 10px 5px',
    padding: '15px 25px 15px 25px',
    borderRadius: '8px',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
    backgroundColor: '#2b273b',
  },
}

const getTodayDateReadable = () => {
  const today = new Date()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  return today.toLocaleDateString('en-US', options)
}

const ExamCard = ({
  isEmbedded = false,
  hideButton = false,
  selectedDate,
  selectedCourse = null,
}) => {
  const [course, setCourse] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [starttime, setStarttime] = useState('')
  const [endtime, setEndtime] = useState('')
  const [location, setLocation] = useState('')
  const [isOpen, setIsOpen] = useState(isEmbedded)
  const [semesters, setSemesters] = useState(null)

  const [examItems, setExamItems] = useState([])
  const [coursesList, setCoursesList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null) // Track which item is being edited    // Listen for custom event from dropdown
  useEffect(() => {
    const handleToggleEvent = () => {
      setIsOpen(!isOpen)
    }

    const handleEditEvent = (event) => {
      const { eventId, eventData } = event.detail
      // Open the modal and populate form with event data
      setIsOpen(true)
      setEditingId(eventId)
      setCourse(eventData.title || eventData.courseCode || '')
      setDescription(eventData.description || '')
      setDate(eventData.date || '')
      setStarttime(eventData.startTime || '')
      setEndtime(eventData.endTime || '')
      setLocation(eventData.location || '')
    }

    window.addEventListener('toggle-exam-planner', handleToggleEvent)
    window.addEventListener('edit-exam-event', handleEditEvent)

    return () => {
      window.removeEventListener('toggle-exam-planner', handleToggleEvent)
      window.removeEventListener('edit-exam-event', handleEditEvent)
    }
  }, [isOpen])

  const getSemesters = async () => {
    try {
      const response = await API.semesters.list()
      setSemesters(response[0])
    } catch (err) {
      console.error('Error fetching semesters:', err)
    }
  }

  useEffect(() => {
    getSemesters()
  }, [])

  const fetchExamData = async () => {
    try {
      setLoading(true)

      const data = await EplannerAPI.getExams()
      setExamItems(data)
    } catch (err) {
      setError('Failed to load data - using empty list')
      setExamItems([])
    } finally {
      setLoading(false)
    }
  }

  // GET - Fetch courses from backend
  const fetchCourses = async () => {
    try {
      if (!semesters?.season || !semesters?.year) {
        setCoursesList([])
        return
      }
      const response = await API.profile.timetable.read({
        season: semesters.season,
        year: semesters.year,
      })
      setCoursesList(response.data || response)
    } catch (err) {
      console.error('Error fetching courses:', err)
      setCoursesList([])
    }
  }

  useEffect(() => {
    if (semesters?.season && semesters?.year) {
      fetchCourses()
    }
  }, [semesters])

  useEffect(() => {
    if (isOpen) {
      fetchExamData()
    }
  }, [isOpen])

  const saveExamData = async () => {
    if (!course.trim()) {
      alert('Please select a course!')
      return
    }

    // Validate time combination
    if (starttime && endtime && starttime >= endtime) {
      alert('End time must be after start time!')
      return
    }

    try {
      setLoading(true)

      const eventDate = date || selectedDate || null
      const itemData = {
        course: course.trim(),
        coursename: course.trim(),
        description: description.trim(),
        date: eventDate,
        starttime: starttime || null,
        endtime: endtime || null,
        location: location.trim() || '',
      }

      if (editingId) {
        // Update existing item
        try {
          await EplannerAPI.updateExam(editingId, itemData)
          await fetchExamData()
        } catch (apiError) {
          // Fallback for local testing
          const updatedItem = { ...itemData, id: editingId }
          setExamItems(
            examItems.map((item) =>
              item.id === editingId ? updatedItem : item
            )
          )
        }
        setEditingId(null) // Clear editing state
      } else {
        // Create new item
        try {
          const savedItem = await EplannerAPI.createExam(itemData)
          setExamItems([...examItems, savedItem])
        } catch (apiError) {
          // Fallback: create a mock item with a temporary ID for local testing
          const mockSavedItem = {
            ...itemData,
            id: Date.now(),
          }
          setExamItems((prevItems) => [...prevItems, mockSavedItem])
        }
      }

      // Notify timetable to refresh
      window.dispatchEvent(new CustomEvent('eplanner-updated'))

      // Show success message
      toast({
        status: 'success',
        content: editingId
          ? 'Exam updated successfully!'
          : 'Exam saved successfully!',
        key: 'exam-save-success',
      })

      // Clear form
      setCourse('')
      setDescription('')
      setDate('')
      setStarttime('')
      setEndtime('')
      setLocation('')
    } catch (err) {
      console.error('Error saving data:', err)
    } finally {
      setLoading(false)
    }
  }

  // const removeExamData = async () => {
  //   try {
  //     setLoading(true)
  //     // console.log("Deleting all exam data...");

  //     const result = await EplannerAPI.deleteExamAll()
  //     // console.log("Deleted all data:", result);

  //     setExamItems([])

  //     // Notify timetable to refresh
  //     window.dispatchEvent(new CustomEvent('eplanner-updated'))

  //     setCourse('')
  //     setDescription('')
  //     setDate('')
  //     setStarttime('')
  //     setEndtime('')
  //     setLocation('')
  //   } catch (err) {
  //     console.error('Error deleting all data:', err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const deleteExamItem = async (itemId) => {
    try {
      setLoading(true)

      await EplannerAPI.deleteExam(itemId)
      setExamItems(examItems.filter((item) => item.id !== itemId))

      // If we were editing this item, clear the editing state
      if (editingId === itemId) {
        setEditingId(null)
        // Clear form
        setCourse('')
        setDescription('')
        setDate('')
        setStarttime('')
        setEndtime('')
        setLocation('')
      }

      // Notify timetable to refresh
      window.dispatchEvent(new CustomEvent('eplanner-updated'))
    } catch (err) {
      console.error(' Error deleting data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Edit exam item - populate form with existing data
  const editExamItem = (item) => {
    setCourse(item.course || item.coursename || '')
    setDescription(item.description || '')
    setDate(item.date || '')
    setStarttime(item.starttime || '')
    setEndtime(item.endtime || '')
    setLocation(item.location || '')
    setEditingId(item.id)
  }

  // Cancel edit - clear form and editing state
  const cancelEdit = () => {
    setEditingId(null)
    setCourse('')
    setDescription('')
    setDate('')
    setStarttime('')
    setEndtime('')
    setLocation('')
  }

  const toggleplanner = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setError('')
    }
  }

  const handleCourseChange = (e) => {
    setCourse(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleDateChange = (e) => {
    e.preventDefault()
    setDate(e.target.value)
  }

  const handleStarttimeChange = (e) => {
    setStarttime(e.target.value)
  }

  const handleEndtimeChange = (e) => {
    setEndtime(e.target.value)
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const isTimeValid = () => {
    if (!starttime || !endtime) return true // If either is empty, no validation needed
    return starttime < endtime
  }

  return (
    <div>
      {!hideButton && (
        <button
          type="button"
          onClick={toggleplanner}
          style={{
            position: 'fixed',
            bottom: '10%',
            right: '17%',
            zIndex: 9999,
            backgroundColor: '#1b1728',
            color: 'white',
            padding: '15px 25px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          }}
          disabled={loading}
        >
          Exam {loading && ''}
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
          }}
        >
          <div
            style={{
              ...styles.crd,
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#9ca3af',
              }}
              onClick={toggleplanner}
            >
              ✕
            </button>

            <h2 style={{ marginBottom: '0px', color: 'white' }}> Exam</h2>

            {error && (
              <div
                style={{
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  border: '1px solid #f5c6cb',
                  borderRadius: '4px',
                  padding: '10px',
                  marginBottom: '15px',
                }}
              >
                {error}
              </div>
            )}

            <div
              style={{
                backgroundColor: '#2b273b',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px',
              }}
            >
              <h3 style={{ marginBottom: '15px', color: 'white' }}>
                Add courses
              </h3>

              <div
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '15px',
                }}
              >
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <div style={{ marginTop: '10px' }}>
                  <svg width="25" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="11"
                      cy="11"
                      r="8"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="m21 21-4.35-4.35"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <select
                  id="eplanner-course"
                  name="course"
                  value={course}
                  onChange={handleCourseChange}
                  placeholder="Enter course name..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#1b1728',
                    color: course ? 'white' : '#9ca3af',
                    margin: '0px 0px',
                  }}
                  disabled={loading}
                  required
                >
                  <option value="" style={{ color: '#9ca3af' }}>
                    Select a course...
                  </option>
                  {coursesList.map((courseItem, index) => {
                    const courseName =
                      courseItem.course ||
                      courseItem.name ||
                      courseItem.title ||
                      courseItem.coursename ||
                      courseItem.code
                    return (
                      <option
                        key={courseItem.id || index}
                        value={courseName}
                        style={{ color: 'white' }}
                      >
                        {courseName}
                      </option>
                    )
                  })}
                </select>
              </div>
              {/* Date */}
              <div
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex' }}>
                  <svg width="25" height="24" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="14"
                      rx="2"
                      ry="2"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="8" cy="2" r="1" fill="#9ca3af" />
                    <circle cx="16" cy="2" r="1" fill="#9ca3af" />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                      stroke="#9ca3af"
                      strokeWidth="2"
                    />
                    <circle
                      cx="7"
                      cy="13"
                      r="0.5"
                      fill="#9ca3af"
                      opacity="0.6"
                    />
                    <circle
                      cx="12"
                      cy="13"
                      r="0.5"
                      fill="#9ca3af"
                      opacity="0.6"
                    />
                    <circle
                      cx="17"
                      cy="13"
                      r="0.5"
                      fill="#9ca3af"
                      opacity="0.6"
                    />
                  </svg>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  style={{
                    position: 'relative',
                    flex: 1,
                    cursor: 'pointer',
                    backgroundColor: '#1b1728',
                    borderRadius: '4px',
                    border: '1px',
                  }}
                  onClick={() =>
                    document.getElementById('eplanner-date').showPicker()
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      document.getElementById('eplanner-date').showPicker()
                    }
                  }}
                >
                  {!date && (
                    <span
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af',
                        fontSize: '16px',
                        pointerEvents: 'none',
                      }}
                    >
                      {getTodayDateReadable()}
                    </span>
                  )}

                  <input
                    id="eplanner-date"
                    name="date"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px',
                      borderRadius: '4px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#1b1728',
                      color: date ? 'white' : 'transparent',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                    disabled={loading}
                  />
                </div>
              </div>
              {/* Start and End Date */}
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}
              >
                <div style={{ marginTop: '10px' }}>
                  <svg width="25" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      fill="none"
                    />
                    <polyline
                      points="12,6 12,12 16,14"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  style={{
                    marginBottom: '15px',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: '#1b1728',
                    borderRadius: '4px',
                    border: '1px',
                  }}
                  onClick={() =>
                    document.getElementById('eplanner-starttime').showPicker()
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      document.getElementById('eplanner-starttime').showPicker()
                    }
                  }}
                >
                  {/* Show placeholder text when no start time is selected */}
                  {!starttime && (
                    <span
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '10px',
                        color: '#9ca3af',
                        fontSize: '16px',
                        pointerEvents: 'none',
                      }}
                    >
                      Start Time
                    </span>
                  )}
                  <input
                    id="eplanner-starttime"
                    name="starttime"
                    type="time"
                    value={starttime}
                    onChange={handleStarttimeChange}
                    style={{
                      width: '100%',
                      padding: '9px 15px',
                      border: '2px',
                      borderRadius: '4px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#1b1728',
                      color: starttime ? 'white' : 'transparent',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    disabled={loading}
                  />
                </div>

                <p
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: '18px',
                    margin: '5px 49px 30px 49px',
                  }}
                >
                  {' '}
                  to{' '}
                </p>

                <div
                  role="button"
                  tabIndex={0}
                  style={{
                    marginBottom: '15px',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: '#1b1728',
                    borderRadius: '4px',
                    border: '1px',
                  }}
                  onClick={() =>
                    document.getElementById('eplanner-endtime').showPicker()
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      document.getElementById('eplanner-endtime').showPicker()
                    }
                  }}
                >
                  {/* Show placeholder text when no end time is selected */}
                  {!endtime && (
                    <span
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '10px',
                        color: '#9ca3af',
                        fontSize: '16px',
                        pointerEvents: 'none',
                      }}
                    >
                      End-Time
                    </span>
                  )}
                  <input
                    id="eplanner-endtime"
                    name="endtime"
                    type="time"
                    value={endtime}
                    onChange={handleEndtimeChange}
                    {...(starttime && { min: starttime })} // Only set min when starttime exists
                    style={{
                      width: '100%',
                      padding: '8px 15px',
                      border: '2px',
                      borderRadius: '4px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#1b1728',
                      color: endtime ? 'white' : 'transparent',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    disabled={loading}
                  />
                </div>
              </div>
              {/* Time validation warning */}
              {starttime && endtime && !isTimeValid() && (
                <div
                  style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    border: '1px solid #f5c6cb',
                    borderRadius: '4px',
                    padding: '10px',
                    marginBottom: '15px',
                    fontSize: '14px',
                  }}
                >
                  ⚠️ End time must be after start time
                </div>
              )}
              {/* Location */}
              <div
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '15px',
                }}
              >
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <div style={{ marginTop: '10px' }}>
                  <svg width="25" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="3"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <input
                  id="eplanner-location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter location..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#1b1728',
                    color: 'white',
                  }}
                  disabled={loading}
                />
              </div>
              {/* Description */}
              <div
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '15px',
                }}
              >
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <svg width="25" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <textarea
                  id="eplanner-description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter description..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    backgroundColor: '#1b1728',
                    color: 'white',
                  }}
                  disabled={loading}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  marginLeft: 'auto',
                }}
              >
                <button
                  type="button"
                  onClick={saveExamData}
                  disabled={loading || (starttime && endtime && !isTimeValid())}
                  style={{
                    backgroundColor:
                      starttime && endtime && !isTimeValid()
                        ? '#6c757d'
                        : '#8080FF',
                    color: 'white',
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor:
                      loading || (starttime && endtime && !isTimeValid())
                        ? 'not-allowed'
                        : 'pointer',
                    fontSize: '16px',
                    margin: '0 10px 0 0px',
                    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))',
                  }}
                >
                  {(() => {
                    if (loading) {
                      return editingId ? 'Updating...' : 'Saving...'
                    }
                    return editingId ? 'Update' : 'Save'
                  })()}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={loading}
                    style={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      padding: '12px 20px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      margin: '0 10px 0 0px',
                      filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))',
                    }}
                  >
                    Cancel
                  </button>
                )}
                {/* <button type="button" onClick={removeExamData} style={{
                      backgroundColor: '#1b1728',
                      color: 'red',
                      padding: '12px 20px',
                      border: '1px solid red',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      margin:'0 0 0 0px',
                      filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))'
                    }}>
                       Remove All
                    </button> */}
              </div>
            </div>

            <div style={{ marginBottom: 'auto' }}>
              <h3
                style={{
                  color: 'white',
                  marginLeft: 'auto',
                  marginBottom: '7px',
                }}
              >
                {' '}
                Your Exams ({examItems.length})
              </h3>

              {loading && (
                <div style={{ textAlign: 'center', padding: '0px' }}>
                  <p> Loading tasks...</p>
                </div>
              )}

              {!loading && examItems.length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '30px',
                    backgroundColor: '#1b1728',
                    borderRadius: '8px',
                    border: '2px',
                  }}
                >
                  <p style={{ fontSize: '48px', margin: '10px 0' }}>X</p>
                  <p style={{ color: '#6c757d', margin: '0' }}>
                    No tasks yet. Add your first task above!
                  </p>
                </div>
              )}

              {!loading && examItems.length > 0 && (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {examItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      style={{
                        backgroundColor: '#1b1728',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '10px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        position: 'relative',
                        border:
                          editingId === item.id
                            ? '2px solid #8080FF'
                            : '1px solid transparent',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '5px',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => deleteExamItem(item.id)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#ff6b6b',
                            fontSize: '16px',
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '3px',
                          }}
                          title="Delete task"
                        >
                          ✕
                        </button>
                        <button
                          type="button"
                          onClick={() => editExamItem(item)}
                          disabled={loading}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color:
                              editingId === item.id ? '#8080FF' : '#FFD93D',
                            fontSize: '14px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            padding: '3px',
                            borderRadius: '3px',
                          }}
                          title="Edit task"
                        >
                          ✎
                        </button>
                      </div>

                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: 'white',
                          paddingRight: '30px',
                        }}
                      >
                        {item.course || item.coursename}
                      </h4>

                      {item.description && (
                        <p style={{ margin: '0 0 10px 0', color: 'white' }}>
                          {item.description}
                        </p>
                      )}

                      {item.date && (
                        <div
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#1b1728',
                            color: 'white',
                            padding: '0px 0px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginRight: '8px',
                          }}
                        >
                          Date: {item.date}
                        </div>
                      )}
                      {item.starttime && (
                        <div
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#1b1728',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginRight: '8px',
                          }}
                        >
                          Start: {item.starttime}
                        </div>
                      )}
                      {item.endtime && (
                        <div
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#1b1728',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          End: {item.endtime}
                        </div>
                      )}
                      {item.location && (
                        <div
                          style={{
                            marginTop: '10px',
                            color: 'white',
                          }}
                        >
                          <strong>Location:</strong> {item.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ExamPlanner = ({ hideButton, selectedDate }) => {
  return <ExamCard hideButton={hideButton} selectedDate={selectedDate} />
}

export default ExamPlanner
