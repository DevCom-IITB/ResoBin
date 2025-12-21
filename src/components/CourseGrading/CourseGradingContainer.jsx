import { Select } from 'antd'
import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import styled from 'styled-components/macro'

import { LoaderAnimation } from 'components/shared'
import { API } from 'config/api'

const isCurrentOrFutureSemester = (year, semester) => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 1-12

  let currentSemester
  if (currentMonth >= 1 && currentMonth <= 5) {
    currentSemester = 1
  } else if (currentMonth >= 8 && currentMonth <= 12) {
    currentSemester = 2
  } else {
    currentSemester = 2
  }

  if (year > currentYear) {
    return true
  }
  if (year === currentYear) {
    return semester >= currentSemester
  }
  return false
}

const CourseGradingContainer = () => {
  const { code } = useParams()

  const [gradingData, setGradingData] = useState([])
  const [yearOptions, setYearOptions] = useState([])
  const [semesterOptions, setSemesterOptions] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!code) return
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await API.gradingStats.list({ code })
        const responseData = res

        if (!Array.isArray(responseData)) {
          setGradingData([])
          setYearOptions([])
          setSemesterOptions([1, 2])
          return
        }

        setGradingData(responseData)

        const years = Array.from(
          new Set(responseData.map((item) => item.year))
        ).sort((a, b) => b - a)
        setYearOptions(years)
        const latestYear = years[0]

        setSemesterOptions([1, 2])

        setSelectedYear(latestYear)
        const hasSem1 = responseData.some(
          (item) => item.year === latestYear && item.semester === 1
        )
        setSelectedSemester(hasSem1 ? 1 : 1) 
      } catch (err) {
        setGradingData([])
        setYearOptions([])
        setSemesterOptions([1, 2]) 
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [code])

  useEffect(() => {
    setSemesterOptions([1, 2])
  }, [selectedYear])

  const filteredData = useMemo(() => {
    if (!gradingData.length) return []
    return gradingData.filter(
      (item) =>
        item.year === Number(selectedYear) &&
        item.semester === Number(selectedSemester)
    )
  }, [gradingData, selectedYear, selectedSemester])

  const hasDataForSelection = useMemo(() => {
    if (!gradingData.length || !selectedYear || !selectedSemester) return false
    return gradingData.some(
      (item) =>
        item.year === Number(selectedYear) &&
        item.semester === Number(selectedSemester)
    )
  }, [gradingData, selectedYear, selectedSemester])

  const isCurrentOrFuture = useMemo(() => {
    if (!selectedYear || !selectedSemester) return false
    return isCurrentOrFutureSemester(
      Number(selectedYear),
      Number(selectedSemester)
    )
  }, [selectedYear, selectedSemester])

  if (loading) return <LoaderAnimation />
  if (!gradingData.length) return <h2>No grading data found.</h2>

  return (
    <>
      <Header>
        <h1>Course Grading</h1>
      </Header>

      <FiltersContainer>
        <Select
          value={selectedYear}
          onChange={(val) => setSelectedYear(Number(val))}
          options={yearOptions.map((year) => ({ value: year, label: year }))}
          placeholder="Select Year"
          style={{ minWidth: 120 }}
        />
        <Select
          value={selectedSemester}
          onChange={(val) => setSelectedSemester(Number(val))}
          options={semesterOptions.map((sem) => ({
            value: sem,
            label: `Semester ${sem}`,
          }))}
          placeholder="Select Semester"
          style={{ minWidth: 150 }}
        />
      </FiltersContainer>

      <ChartsWrapper>
        {hasDataForSelection ? (
          filteredData.flatMap((entry) =>
            Object.entries(entry.gradingData || {}).map(
              ([division, grades]) => {
                const gradeOrder = [
                  'AP',
                  'AA',
                  'AB',
                  'BB',
                  'BC',
                  'CC',
                  'CD',
                  'DD',
                  'FF',
                  'FR',
                  'II',
                ]
                const chartData = Object.entries(grades)
                  .filter(([grade]) => grade.toLowerCase() !== 'total') 
                  .map(([grade, value]) => ({
                    grade: grade.toUpperCase(),
                    value: parseInt(value, 10),
                  }))
                  .sort(
                    (a, b) =>
                      gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade)
                  )

                const divisionTotal = parseInt(
                  grades.Total || grades.total || 0,
                  10
                )

                return (
                  <Container
                    key={`${entry.year}-${entry.semester}-${division}`}
                  >
                    <h3>
                      {division.charAt(0).toUpperCase() + division.slice(1)} -
                      Total Students : {divisionTotal}
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="grade" />
                        <YAxis />
                        <Tooltip formatter={(value) => [value, 'Students']} />
                        <Bar
                          dataKey="value"
                          fill="#8884d8"
                          isAnimationActive
                          animationDuration={1500}
                          animationEasing="ease-in-out"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Container>
                )
              }
            )
          )
        ) : (
          <NoDataMessage>
            <p>
              {isCurrentOrFuture ? (
                <>
                  Statistics for {selectedYear} Semester {selectedSemester} will
                  be available after the semester ends.
                </>
              ) : (
                <>
                  The course did not run in {selectedYear} Semester{' '}
                  {selectedSemester}. Please check on ASC for confirmation.
                </>
              )}
            </p>
          </NoDataMessage>
        )}
      </ChartsWrapper>
    </>
  )
}

export default CourseGradingContainer

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 1rem 0;
`

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const ChartsWrapper = styled.div`
  max-height: 80vh; 
  overflow-y: auto;
  padding-right: 1rem;
`

const Container = styled.div`
  height: 300px;
  margin-top: 0rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem 1.5rem 1rem; 
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`

const NoDataMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  p {
    margin: 0;
    font-size: 1.1rem;
  }
`
