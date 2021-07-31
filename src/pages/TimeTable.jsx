import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

import {
  TimeTableLectureItem,
  TimeTableDay,
  TimeTableTimeSlot,
} from 'components/TimeTable'
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

      <div className="schedule-container">
        <div className="schedule-stage__wrapper">
          <TimeTableDay title="Stage X">
            <TimeTableTimeSlot time="8:00am - 9:00am">
              <TimeTableLectureItem
                title="CSR, SSR, SSG, ISR and OMG.WTF?BBQ!"
                img="https://randomuser.me/api/portraits/lego/6.jpg"
                subtitle="Ahmad Awais"
              />
            </TimeTableTimeSlot>

            <TimeTableTimeSlot time="9:00am - 10:00am">
              <TimeTableLectureItem
                title="CSR, SSR, SSG, ISR and OMG.WTF?BBQ!"
                img="https://randomuser.me/api/portraits/lego/6.jpg"
                subtitle="Ahmad Awais"
              />

              <TimeTableLectureItem
                title="Changing Lanes with Lyft"
                img="https://randomuser.me/api/portraits/lego/2.jpg"
                subtitle="Joshua Callender"
              />

              <TimeTableLectureItem
                title="Magic Authentication - The Missing LEGO Piece"
                img="https://randomuser.me/api/portraits/lego/1.jpg"
                subtitle="Sean Li"
              />
            </TimeTableTimeSlot>

            <TimeTableTimeSlot time="10:00am - 11:00am">
              <TimeTableLectureItem
                title="Introducing: Edge Slice Rerendering. Performant A/B Testing, Personalization, and more."
                img="https://randomuser.me/api/portraits/lego/3.jpg"
                subtitle="Jay Phelps"
              />
            </TimeTableTimeSlot>

            <TimeTableTimeSlot time="11:00am - 12:00pm">
              <TimeTableLectureItem
                title="Everything Is a CMS"
                img="https://randomuser.me/api/portraits/lego/5.jpg"
                subtitle="Sean C Davis"
              />
            </TimeTableTimeSlot>

            <TimeTableTimeSlot time="12:00pm - 1:00pm">
              <TimeTableLectureItem
                title="Responsive Rendering with Next.js"
                img="https://randomuser.me/api/portraits/lego/8.jpg"
                subtitle="Armando Gonzalez"
              />
            </TimeTableTimeSlot>
          </TimeTableDay>
        </div>
      </div>
    </Container>
  )
}

export default TimeTable

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  .section-container {
    padding: 4rem;
    a {
      color: #ffffff;
    }
  }

  .schedule-container {
    overflow: auto;
  }

  .schedule-stage__wrapper {
    display: inline-block;
  }

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }

  @media ${device.min.xl} {
    padding-right: ${({ theme }) => theme.asideWidthRight};
    transition: padding-right 200ms ease-in;
  }
`
