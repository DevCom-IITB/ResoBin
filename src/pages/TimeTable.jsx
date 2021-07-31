import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

import { TimeTableLectureItem } from 'components/TimeTable'
import { device } from 'styles/responsive'

const CoursePage = ({ match }) => {
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
      <TimeTableLectureItem
        title="CSR, SSR, SSG, ISR and OMG.WTF?BBQ!"
        img="https://randomuser.me/api/portraits/lego/6.jpg"
        subtitle="Ahmad Awais"
      />
    </Container>
  )
}

export default CoursePage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  background: black;
  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }

  @media ${device.min.xl} {
    padding-right: ${({ theme }) => theme.asideWidthRight};
    transition: padding-right 200ms ease-in;
  }
`
