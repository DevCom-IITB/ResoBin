import styled from 'styled-components/macro'

import { FavoriteToggle } from 'components/Favourites'
import { Divider } from 'components/shared'
import { TimetableSelector } from 'components/Timetable'
import { device, fontSize } from 'styles/responsive'

import CourseWorkload from './CourseWorkload'

const CoursePageBody = ({ courseData }) => {
  const {
    code,
    title,
    department,
    credits,
    description,
    workload,
    semester,
    favoritedByCount,
  } = courseData

  return (
    <Container>
      <CourseInfo>
        <h1>{code}</h1>
        <FavoriteContainer>
          <FavoriteToggle code={code} initialCount={favoritedByCount} />
        </FavoriteContainer>

        <h2>{title}</h2>
        <h3>
          {department.name} &ensp;&#9679;&ensp; {credits} credits
        </h3>

        <Divider margin="0.25rem 0" />

        <p>{description || 'Not available'}</p>
      </CourseInfo>

      <Divider margin="0.75rem 0" />

      <FlexGap>
        <CourseWorkload workload={workload} />

        <TimetableSelector semester={semester} />
      </FlexGap>
    </Container>
  )
}

export default CoursePageBody

const Container = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.5rem 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  @media ${device.max.xs} {
    margin-top: 0.75rem;
    padding: 0.75rem;
  }
`

const CourseInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  color: ${({ theme }) => theme.textColor};

  h1 {
    line-height: 1;
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    font-size: ${fontSize.responsive.$4xl};
  }

  h2 {
    font-size: ${fontSize.responsive.xl};
  }

  h3 {
    display: flex;
    font-weight: 400;
    font-size: ${fontSize.responsive.xs};
  }

  p {
    font-weight: 300;
    font-size: ${fontSize.responsive.sm};
    text-align: justify;
    font-family: 'Source Sans Pro', sans-serif;
    margin: 0;
  }
`

const FavoriteContainer = styled.div`
  position: absolute;
  margin: 1.5rem 1rem;
  right: 0;
  top: 0;

  @media ${device.max.xs} {
    margin: 0.75rem 0.5rem;
    flex-direction: column;
  }
`

const FlexGap = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;

  @media ${device.max.xs} {
    flex-direction: column;
    align-items: center;
  }
`
