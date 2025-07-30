// import { Empty } from 'antd';
import { X } from '@styled-icons/heroicons-outline'
import { Card } from 'antd'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'



// import { CourseSearch } from 'components/CourseFinder'
// import { QuickReviewContainer } from 'components/QuickReview'
import {Aside, toast } from 'components/shared'
import { AsideHeader } from 'components/shared/Aside'
import { ButtonIconDanger } from 'components/shared/Buttons'
import { PageHeading, PageTitle } from 'components/shared/Layout'
import { API } from 'config/api'
import { coursePageUrl } from 'helpers'
import { selectSemesters } from 'store/courseSlice'
import { selectUserProfile } from 'store/userSlice'


const HomeItem = ({ course, hash }) => {
  const { code, title } = course

  return (
    <Link to={coursePageUrl(code, title, hash)}>
      <Card hoverable style={{ display: 'inline-block' }}>
        <Card.Meta title={code} description={title} />
      </Card>
    </Link>
  )
}

const CoursesThisSemester = () => {
  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [coursedata, setCoursedata] = useState({})
  const [loading, setLoading] = useState(false)

  const semesterList = useSelector(selectSemesters)
  const [semIdx, setSemIdx] = useState(null)

  useEffect(() => {
    if (semesterList.length) setSemIdx(semesterList.length - 1)
  }, [semesterList])

  const fetchUserTimetable = useCallback(async (_semester) => {
    try {
      setLoading(true)
      const response = await API.profile.timetable.read(_semester)
      setCourseTimetableList(response)
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (semIdx !== null && semesterList[semIdx]) {
      fetchUserTimetable(semesterList[semIdx])
    }
  }, [fetchUserTimetable, semIdx, semesterList])

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true)
        const courseList = courseTimetableList.map((item) => item.course)
        const promises = courseList.map((code) => API.courses.read({ code }))
        const courseDataArray = await Promise.all(promises)
        const courseDataObj = {}
        courseDataArray.forEach((course) => {
          courseDataObj[course.code] = course
        })
        setCoursedata(courseDataObj)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    if (courseTimetableList.length > 0) {
      fetchCourseData()
    }
  }, [courseTimetableList])

  return (
    <>
      <TabRow>
        <Tab active>Courses this Semester</Tab>
        <Tab>Saved Courses</Tab>
        <TotalCredits>
          Total Credits:{' '}
          {Object.values(coursedata).reduce((sum, course) => sum + (course?.credits || 0), 0)}
        </TotalCredits>
      </TabRow>

      <ScrollRow>
        {courseTimetableList.map(({ id, course }) => {
          const courseData = coursedata[course]
          if (!courseData) return null

          const { code, credits, professor } = courseData

          return (
            <StyledLink key={id} to={coursePageUrl(code)}>
              <StyledCard hoverable>
                <Card.Meta
                  title={<CardTitleRow>{code}</CardTitleRow>}
                  description={
                    <>
                      <DetailLine>
                        <ProfTag>{professor ? `Prof. ${professor}` : 'No Instructor'}</ProfTag>
                      </DetailLine>
                      <DetailLine>Credits: {credits}</DetailLine>
                    </>
                  }
                />
              </StyledCard>
            </StyledLink>
          )
        })}

        {courseTimetableList.length === 0 && !loading && (
          <NoCoursesMsg>No Courses this semester yet!</NoCoursesMsg>
        )}
      </ScrollRow>
    </>
  )
}

const HomeContainer = () => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [favCourseData, setFavCourseData] = useState([])
  useEffect(() => {
    const fetchFavCourses = async () => {
      // copy this into homepage
      try {
        setLoading(true)
        const response = await API.profile.favorites()
        setFavCourseData(response.results)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await API.stats.list()
        setStats(response)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    fetchFavCourses()
  }, [])
  const profile = useSelector(selectUserProfile)
  return (
    <>
      <PageTitle
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginTop: '1rem',
          marginLeft: '1rem',
        }}
      >
        Welcome back, {profile?.name?.split(' ')?.[0]}!
        <div
          style={{
            color: '#b0aecd',
            fontSize: '1rem',
            marginTop: '0.3rem',
          }}
        >
          Here&apos;s everything you need for today
        </div>
      </PageTitle>

      {/* <CourseSearch loading={loading} setLoading={setLoading} /> */}

      <Container>
        <StatsContainer>
          <AsideHeader title="My Favourites" loading={loading} />

          <Flex>
            {favCourseData.length !== 0 ? (
              favCourseData?.map((course) => (
                <HomeItem key={course.code} course={course} />
              ))
            ) : (
              <NoFavDiv>
                {!loading && 'No favourite Courses'}
              </NoFavDiv>
            )}
          </Flex>

          <AsideHeader title="Most Favourites" loading={loading} />

          <Flex>
            {stats?.courses?.popular?.map((course) => (
              <HomeItem key={course.code} course={course} />
            ))}
          </Flex>
        </StatsContainer>
        {/* <ReviewContainer>
          <AsideHeader title="Quick Review" loading={loading} />
          <QuickReviewContainer />
        </ReviewContainer> */}
      </Container>
      <CoursesThisSemester />
      {/* <Aside title="Feed">
        <Empty description={<PageSubtitle>Coming soon!</PageSubtitle>} />
      </Aside> */}
    </>
  )
}

export default HomeContainer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`

// const ReviewContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   padding: 1rem;
//   background: ${({ theme }) => theme.secondary};
//   border-radius: ${({ theme }) => theme.borderRadius};
//   width: 80%;
//   margin: auto;
// `

const Flex = styled.div`
  display: flex;
  flex-basis: 100%;
  gap: 0.5rem;
  overflow-x: scroll;
`
const NoFavDiv = styled.div`
  color: #302718;
  font-size: 1rem;
  font-weight: 500;
`
const TabRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const Tab = styled.div`
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-bottom: ${({ active }) => (active ? '3px solid white' : 'none')};
  color: ${({ active }) => (active ? 'white' : '#999')};
  cursor: pointer;
`

const TotalCredits = styled.div`
  margin-left: auto;
  font-weight: 500;
  font-size: 0.95rem;
  color: #ccc;
`

const ScrollRow = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
`

const StyledLink = styled(Link)`
  margin-right: 1rem;
  text-decoration: none;
`

const StyledCard = styled(Card)`
  background: #252540;
  border-radius: 10px;
  padding: 1rem;
  width: 200px;
  color: white;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
    background: #2e2e4d;
  }

  .ant-card-meta-title {
    color: white;
  }

  .ant-card-meta-description {
    color: #ccc;
  }
`

const CardTitleRow = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`

const TitleLine = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`

const DetailLine = styled.div`
  font-size: 0.75rem;
  margin-top: 4px;
`

const ProfTag = styled.span`
  background-color: #3e3e60;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
`

const NoCoursesMsg = styled.div`
  padding: 1rem;
  font-size: 1rem;
  color: #bbb;
`



