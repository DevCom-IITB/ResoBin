import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

// import {
//   TimeTableLectureItem,
//   TimeTableDay,
//   TimeTableTimeSlot,
// } from 'components/TimeTable'
import TimeTableV2 from 'components/TimeTable/v2/TimeTable'
import { device } from 'styles/responsive'

const TimeTable = ({ match }) => {
  return (
    <Container>
      <Helmet>
        <title>TimeTable - ResoBin</title>
        <meta
          property="description"
          content="IIT B time table for selected courses"
        />
      </Helmet>
      <h1>Time Table</h1>
      <TimeTableV2 />
    </Container>
  )
}

export default TimeTable

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }

  @media ${device.min.xl} {
    padding-right: ${({ theme }) => theme.asideWidthRight};
    transition: padding-right 200ms ease-in;
  }
`
