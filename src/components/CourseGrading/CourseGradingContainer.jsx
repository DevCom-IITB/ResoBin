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

const CourseGradingContainer = () => {
  const { code } = useParams()

  const [gradingData, setGradingData] = useState([])
  const [yearOptions, setYearOptions] = useState([])
  const [semesterOptions, setSemesterOptions] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch grading stats
  useEffect(() => {
    if (!code) return
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await API.gradingStats.list({ code })
        const responseData = res

        if (!Array.isArray(responseData)) {
          console.error('Unexpected API format', res)
          setGradingData([])
          setYearOptions([])
          setSemesterOptions([])
          return
        }

        setGradingData(responseData)

        const years = Array.from(
          new Set(responseData.map((item) => item.year))
        ).sort((a, b) => b - a)
        setYearOptions(years)
        const latestYear = years[0]

        const semestersForLatestYear = Array.from(
          new Set(
            responseData
              .filter((item) => item.year === latestYear)
              .map((item) => item.semester)
          )
        ).sort((a, b) => b - a)

        setSemesterOptions(semestersForLatestYear)

        // Default select latest year and semester
        setSelectedYear(latestYear)
        setSelectedSemester(semestersForLatestYear[0])
      } catch (err) {
        console.error('Error fetching grading stats:', err)
        setGradingData([])
        setYearOptions([])
        setSemesterOptions([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [code])

  // Filtered data based on selection
  const filteredData = useMemo(() => {
    if (!gradingData.length) return []
    return gradingData.filter(
      (item) =>
        item.year === Number(selectedYear) &&
        item.semester === Number(selectedSemester)
    )
  }, [gradingData, selectedYear, selectedSemester])

  if (loading) return <LoaderAnimation />
  if (!gradingData.length) return <h2>No grading data found.</h2>

  return (
    <>
      <Header>
        <h1>Course Grading</h1>
      </Header>

      {/* Filters */}
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

      {/* Chart Display */}
      <ChartsWrapper>
        {filteredData.length > 0 ? (
          filteredData.flatMap((entry) =>
            Object.entries(entry.gradingData || {}).map(([division, grades]) => {
              const gradeOrder = ['AP', 'AA', 'AB', 'BB', 'BC', 'CC', 'CD', 'DD', 'FF', 'FR', 'II']
              const chartData = Object.entries(grades)
                .filter(([grade]) => grade.toLowerCase() !== 'total') // remove Total
                .map(([grade, value]) => ({
                  grade: grade.toUpperCase(),
                  value: parseInt(value, 10),
                }))
                .sort((a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade))

              return (
                <Container key={`${entry.year}-${entry.semester}-${division}`}>
                  <h3>
                    {division.charAt(0).toUpperCase() + division.slice(1)} - Total Students : {entry.totalStudents}
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
            })
          )
        ) : (
          <p>No grading data available.</p>
        )}
      </ChartsWrapper>
    </>
  )
}

export default CourseGradingContainer

// Styled Components
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
  max-height: 80vh; /* vertical limit for scrolling */
  overflow-y: auto;
  padding-right: 1rem;
`

const Container = styled.div`
  height: 300px;
  margin-top: 0rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem 1.5rem 1rem; /* top right bottom left */
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`
