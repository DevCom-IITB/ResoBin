// import { Empty } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseResourceContainer } from 'components/CourseResource'
import { CourseReviewContainer } from 'components/CourseReview'
import { FavoriteToggle } from 'components/Favourites'
// import { Aside, PageSubtitle, Tabs, Divider } from 'components/shared'
import { Tabs, Divider, toast } from 'components/shared'
import { TimetableSelector } from 'components/Timetable'
import { API } from 'config/api'
import { selectCurrentSemester } from 'store/courseSlice'
import { device, fontSize } from 'styles/responsive'

import CoursePageBreadcrumbs from './CoursePageBreadcrumbs'
import CourseWorkload from './CourseWorkload'

const CourseProfessors = ({ semester }) => {
  const latestSemester = useSelector(selectCurrentSemester)
  const professors = semester
    ?.find(
      ({ season, year }) =>
        season === latestSemester?.season && year === latestSemester?.year
    )
    ?.timetable?.map(({ professor, division }) => ({ division, professor }))

  if (!professors?.length) return null

  return (
    professors.length && (
      <CourseProfessorsContainer>
        <h3>Instructors:</h3>

        <ProfessorList>
          {professors.map(({ division, professor }) => (
            <span key={`${division}-${professor}`}>
              {division}: <b>{professor}</b>
            </span>
          ))}
        </ProfessorList>
      </CourseProfessorsContainer>
    )
  )
}

const CPICutoff = ({ cutoff }) => {
  if (typeof cutoff !== 'undefined' && cutoff !== null && cutoff.length > 0) {
    return (
      <h3>
        &ensp;&#9679;&ensp; CPI CutOff: {cutoff[cutoff.length - 1].cutoff}
      </h3>
    )
  }
  return null
}

const CoursePageContainer = ({ courseData, cutoffs }) => {
  const {
    code,
    title,
    department,
    credits,
    description,
    workload,
    semester,
    favoritedByCount,
    reviewsIgnore,
    resourcesIgnore,
  } = courseData
  const location = useLocation()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState(null)
  const [, setLoading] = useState(true)
  const [allResCount, setAllResCount] = useState(0)
  const [allRevCount, setAllRevCount] = useState(0)

  const handleTabChange = (key) => {
    location.hash = key
    navigate(location, { replace: true })
  }

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        const response = await API.courses.listResources({ code })
        let resCount = 0
        response.forEach((resource) => {
          resCount += 1
          setAllResCount(resCount)
        })
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await API.courses.listReviews({ code })
        let revCount = 0
        response.forEach((review) => {
          revCount += 1
          setAllRevCount(revCount)
        })
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
    setActiveKey(location.hash.split('#')[1] ?? 'reviews')
  }, [location.hash])

  return (
    <div>
      <CoursePageBreadcrumbs courseTitle={`${code}: ${title}`} />

      <CoursePageBody>
        <CourseInfo>
          <h1>{code}</h1>
          <FavoriteContainer>
            <FavoriteToggle code={code} initialCount={favoritedByCount} />
          </FavoriteContainer>

          <h2>{title}</h2>
          <h3>
            {department.name} &ensp;&#9679;&ensp; {credits} credits{' '}
            <CPICutoff cutoff={cutoffs} />
          </h3>

          <Divider margin="0.25rem 0" />

          <p>{description || 'Not available'}</p>
        </CourseInfo>

        <Divider margin="0.75rem 0" />

        <FlexGap>
          <CourseWorkload workload={workload} />
          <CourseProfessors semester={semester} />
          <TimetableSelector semester={semester} />
        </FlexGap>
      </CoursePageBody>

      <Container>
        <Tabs
          tabheight="2.25rem"
          tabwidth="7.5rem"
          animated
          activeKey={activeKey}
          onChange={handleTabChange}
        >
          <Tabs.TabPane
            key="reviews"
            tab={allRevCount ? `Reviews (${allRevCount})` : `Reviews`}
          >
            <CourseReviewContainer />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="resources"
            tab={allResCount ? `Resources (${allResCount})` : `Resources`}
          >
            <CourseResourceContainer />
          </Tabs.TabPane>
        </Tabs>
      </Container>
    </div>
  )
}

export default CoursePageContainer

const Container = styled.div`
  margin-bottom: 1rem;
  padding: 1.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`

const CoursePageBody = styled.div`
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
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textColor};

  h1 {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    font-size: ${fontSize.responsive.$4xl};
    line-height: 1;
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
    margin: 0;
    font-weight: 300;
    font-size: ${fontSize.responsive.sm};
    font-family: 'Source Sans Pro', sans-serif;
    text-align: justify;
  }
`

const FavoriteContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1.5rem 1rem;

  @media ${device.max.xs} {
    flex-direction: column;
    margin: 0.75rem 0.5rem;
  }
`

const FlexGap = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  justify-content: space-between;

  @media ${device.max.xs} {
    flex-direction: column;
    align-items: center;
  }
`

const CourseProfessorsContainer = styled.div`
  color: ${({ theme }) => theme.textColor};

  h3 {
    font-weight: 400;
    margin-bottom: 0.25rem;
  }
`

const ProfessorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: ${({ theme }) => theme.darksecondary};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`
