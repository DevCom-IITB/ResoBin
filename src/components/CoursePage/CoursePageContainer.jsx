import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseResourceContainer } from 'components/CourseResource'
import { CourseReviewContainer } from 'components/CourseReview'
import { FavoriteToggle } from 'components/Favourites'
// import { Aside, PageSubtitle, Tabs, Divider } from 'components/shared'
import { Aside, Tabs, Divider, toast } from 'components/shared'
import { TimetableSelector } from 'components/Timetable'
import { API } from 'config/api'
import { selectCurrentSemester } from 'store/courseSlice'
import { device, fontSize } from 'styles/responsive'

import CoursePageBreadcrumbs from './CoursePageBreadcrumbs'
import CourseSlot from './CourseSlot'

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

const SimilarCourses = ({ courses }) => {
  if (courses.length === 0) {
    return (
      <SimilarContainer>
        <h3>No similar courses found</h3>
      </SimilarContainer>
    )
  }

  return (
    <SimilarContainer>
      <SimilarList>
        {courses.map((course) => (
          <CourseLink
            key={course.code}
            to={`/courses/${course.code}`}
            data-umami-event="Similar Courses"
          >
            <b>{course.code}</b>
            <p>{course.title}</p>
          </CourseLink>
        ))}
      </SimilarList>
    </SimilarContainer>
  )

  // return (
  //   <SimilarContainer>
  //     <HeadingWithTooltip data-tooltip="Ensure you review each course's description before making a selection">
  //       Similar Courses:
  //     </HeadingWithTooltip>
  //     <SimilarList>
  //       {courses.map((course) => (
  //         <CourseLink key={course.code} to={`/courses/${course.code}`}>
  //           <b>{course.code}</b>
  //         </CourseLink>
  //       ))}
  //     </SimilarList>
  //   </SimilarContainer>
  // )
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
    workloadIgnore,
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
  const [similarCourses, setSimilarCourses] = useState([])

  const fetchSimilarCourses = async () => {
    try {
      const response = await API.similarCourses.read({ code: courseData.code })
      setSimilarCourses(response)
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }

  const handleTabChange = (key) => {
    location.hash = key
    navigate(location, { replace: true })
  }

  useEffect(() => {
    fetchSimilarCourses()
    const fetchResources = async () => {
      try {
        setLoading(true)
        const response = await API.courses.listResources({ code })
        setAllResCount(Object.keys(response).length)
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
        setAllRevCount(Object.keys(response).length)
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
    <>
      <CoursePageBreadcrumbs courseTitle={`${code}: ${title}`} />
      <ParentContainer>
        <MainContent>
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
              <CourseSlot semester={semester} />
              <CourseProfessors semester={semester} />
              <TimetableSelector semester={semester} />
            </FlexGap>

            <Divider margin="0.75rem 0" />
            {/* <SimilarCourses courses={similarCourses} /> */}
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
        </MainContent>
        <Aside title="Similar Courses">
          <SimilarCourses courses={similarCourses} />
        </Aside>
      </ParentContainer>
    </>
  )
}

export default CoursePageContainer

const ParentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`

const MainContent = styled.div`
  width: 100%;

  @media (min-width: 1200px) {
    width: calc(100% - 257px);
  }
`

const Container = styled.div`
  margin-bottom: 1rem;
  padding: 1.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  // max-width: 79.5%;
`

const CoursePageBody = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.5rem 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  // max-width: 79.5%;

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

const SimilarContainer = styled.div`
  color: ${({ theme }) => theme.textColor};
  display: flex;
  gap: 1rem;
`

const SimilarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 18rem;
`

const CourseLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  display: block;
  font-family: 'Source Sans Pro', sans-serif;

  p {
    margin-top: 0.35rem;
    margin-bottom: 0;
    color: ${({ theme }) => theme.primary};
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400;
    font-size: ${fontSize.responsive.sm};
  }

  &:hover {
    background: ${({ theme }) => theme.darksecondary};
    text-decoration: none;
  }
`

// const HeadingWithTooltip = styled.h3`
//   font-weight: 400;
//   margin-bottom: 0.25rem;
//   position: relative; // Needed to position the tooltip
//   cursor: pointer; // Changes the cursor to indicate it's hoverable

//   &::after {
//     content: '';
//     position: absolute;
//     z-index: 10;
//     left: 50%; // Center above the heading
//     top: 0; // Position at the top of the heading
//     transform: translate(-50%, -100%); // Adjust horizontally and move up
//     padding: 0.25rem 0.5rem; // Smaller padding
//     border-radius: ${({ theme }) =>
//       theme.borderRadius}; // Use your theme's border-radius
//     background-color: black; // Tooltip background color
//     color: white; // Tooltip text color
//     font-size: 0.75rem; // Smaller font size
//     white-space: nowrap; // Keeps the tooltip text on one line
//     box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); // Optional: adds a shadow effect
//     visibility: hidden; // By default, the tooltip is not visible
//     opacity: 0; // Start invisible
//     transition: opacity 0.3s, visibility 0.3s, transform 0.3s; // Transition for appearance and position
//     pointer-events: none; // Prevents the tooltip from being clickable and blocking other elements
//   }

//   &:hover::after {
//     content: attr(data-tooltip); // Now the content is only added on hover
//     visibility: visible; // Make it visible
//     opacity: 1; // Fully opaque
//     transform: translate(
//       -50%,
//       -110%
//     ); // Adjust position to move slightly above the heading
//   }
// `

// const SimilarContainer = styled.div`
//   color: ${({ theme }) => theme.textColor};

//   h3 {
//     font-weight: 400;
//     margin-bottom: 0.25rem;
//   }

//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `

// const CourseLink = styled(Link)`
//   color: ${({ theme }) => theme.textColor};
//   background: ${({ theme }) => theme.darksecondary};
//   padding: 0.5rem;
//   margin-right: 0.5rem;
//   border-radius: ${({ theme }) => theme.borderRadius};
//   text-decoration: none;
//   display: block;
//   text-align: center;

//   &:hover {
//     background: #7465a6;
//     text-decoration: none;
//   }
// `

// const SimilarList = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 0.25rem;
//   overflow-x: auto;
// `
