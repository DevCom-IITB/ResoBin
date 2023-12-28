import { Rate } from 'antd'
import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import { toast } from 'components/shared'
import { API } from 'config/api'

const QuickReviewContainer = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [questions, setQuestions] = useState([])
  const [semesters, setSemesters] = useState({})
  const [ratings, setRatings] = useState({})

  const desc = [
    'Very Unsatisfactory',
    'Unsatisfactory',
    'Neutral',
    'Satisfactory',
    'Excellent',
  ]

  const getSemesters = async () => {
    try {
      const response = await API.semesters.list()
      setSemesters(response[1])
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }

  const fetchUserTimetable = useCallback(async (season, year) => {
    try {
      const givenReviews = await API.profile.rapidreviews.list()
      const response = await API.profile.timetable.read({
        season,
        year,
      })

      const coursesToFilter = givenReviews.map((item) => item.course)

      const filteredCourses = response.filter(
        (item) => !coursesToFilter.includes(item.course)
      )

      setCourseTimetableList(filteredCourses)
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }, [])

  const createContent = async ({ code, body }) => {
    try {
      await API.rapidreviews.create({
        payload: { course: code, parent: null, body },
      })
      toast({ status: 'success', content: 'Thanks for the review!' })
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }

  useEffect(() => {
    getSemesters()
  }, [])

  useEffect(() => {
    if (semesters.season && semesters.year) {
      fetchUserTimetable(semesters.season, semesters.year)
    }
  }, [semesters])

  useEffect(() => {
    const courseList = courseTimetableList.map((item) => item.course)
    setCourses(courseList)

    if (courseList.length > 0) {
      setSelectedCourse(courseList[0])
    }
  }, [courseTimetableList])

  useEffect(() => {
    if (selectedCourse) {
      // Placeholder for fetching questions
      setQuestions([
        'How was your overall experience taking this course?',
        'How much was the course content and material relevant while preparing for exams?',
        'How much of conceptual clarity and understanding did you gain through this course?',
        'How was the evaluation and grading scheme?',
        'Did the instructor communicate well? Were the lectures both interactive and engaging?',
        'How well did the course meet your expectations?',
        'How likely are you to recommend this course to others?',
      ])
    } else {
      setQuestions([])
    }
  }, [selectedCourse])

  const handleRatingChange = (index, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [index]: value,
    }))
  }

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value)
  }

  function convertJsonToHtmlString(jsonRatings) {
    const jsonData = JSON.parse(jsonRatings)
    let htmlString = ''
    Object.entries(jsonData).forEach(([question, value]) => {
      htmlString += `<h3>${question} - ${desc[value - 1]}</h3><br>`
    })
    return htmlString
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createContent({
        code: selectedCourse,
        body: convertJsonToHtmlString(JSON.stringify(ratings)),
      })

      setSelectedCourse('')
      setRatings({})

      if (semesters.season && semesters.year) {
        await fetchUserTimetable(semesters.season, semesters.year)
      }
    } catch (error) {
      // Handle error if the review submission fails
      toast({ status: 'error', content: error })
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {courses.length > 0 ? (
          <DropdownContainer>
            <Label htmlFor="course-select">
              <Dropdown
                id="course-select"
                onChange={handleCourseChange}
                value={selectedCourse}
              >
                <option value="">Select a Course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </Dropdown>
            </Label>
          </DropdownContainer>
        ) : (
          <div>
            <h4 style={{ textAlign: 'center', paddingBottom: '15px' }}>
              There are no courses for you to review here (maybe because you
              didnt add any course to your timetable last semester 😅), you can
              still visit the respective course page on ResoBin to write a
              detailed review about your experience with the course.
            </h4>
            <h4 style={{ textAlign: 'center', paddingBottom: '5px' }}>
              Thank you!
            </h4>
          </div>
        )}
        {selectedCourse &&
          questions.map((question) => (
            <QuestionContainer key={question}>
              {' '}
              {/* Use the question text itself as the key */}
              <Label>
                {question}
                <Stars>
                  <Rate
                    tooltips={desc}
                    onChange={(value) => handleRatingChange(question, value)}
                    value={ratings[question] || 3}
                  />
                </Stars>
              </Label>
            </QuestionContainer>
          ))}
        {selectedCourse && (
          <SubmitButton type="submit" data-umami-event="Rapid Review Submit">
            Submit
          </SubmitButton>
        )}
      </form>
    </Container>
  )
}

export default QuickReviewContainer

// Styled components
const Container = styled.div`
  background-color: ${({ theme }) => theme.darksecondary};
  border-radius: 8px;
  padding: 20px;
  color: white;
  width: 100%;
`

const DropdownContainer = styled.div`
  margin-bottom: 20px;
`

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`

const Stars = styled.label`
  display: block;
`

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`

const Dropdown = styled.select`
  width: 100%;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px 0;
  color: white;
  background-color: ${({ theme }) => theme.secondary};
`

const SubmitButton = styled.button`
  background-color: #707aff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
`
