import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styled from 'styled-components/macro'
import dummyData from './ScrapedData'

const data = dummyData

const CourseGradingContainer = () => {
  return (
    <>
      <Header>
        <h1>Course Grading</h1>
      </Header>
      <Container>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#8884d8"
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </Container>
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

const Container = styled.div`
  height: 300px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`
