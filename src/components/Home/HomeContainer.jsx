// import { Empty } from 'antd';
import { X } from '@styled-icons/heroicons-outline'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'


// import { CourseSearch } from 'components/CourseFinder'
// import { QuickReviewContainer } from 'components/QuickReview'
import {Aside, Card, toast } from 'components/shared'
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

const SavedCoursesRow = () => {
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

  const removeFromTimetable = (id, code) => async () => {
    try {
      setLoading(true)
      await API.profile.timetable.remove({ id })
      setCourseTimetableList((prev) =>
        prev.filter((item) => item.id !== id)
      )
      toast({ status: 'success', content: `Removed ${code} from timetable` })
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SectionHeading>Courses this Semester</SectionHeading>
      <ScrollRow>
        {courseTimetableList.map(({ id, course }) => {
          const courseData = coursedata[course]
          if (!courseData) return null

          const { code, title, credits, instructor } = courseData
          return (
            <StyledLink key={id} to={coursePageUrl(code, title)}>
              <StyledCard hoverable>
                <Card.Meta
                  title={
                    <CardTitleRow>
                      {code}
                      <ButtonIconDanger
                        icon={<X size="20" />}
                        tooltip="Remove"
                        onClick={(e) => {
                          e.preventDefault()
                          removeFromTimetable(id, code)()
                        }}
                        disabled={loading}
                        hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
                      />
                    </CardTitleRow>
                  }
                  description={
                    <>
                      <TitleLine>{title}</TitleLine>
                      <DetailLine>
                        {instructor ? `Prof. ${instructor}` : 'No Instructor'}
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
          <NoCoursesMsg>No saved courses</NoCoursesMsg>
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
        <SavedCoursesRow />
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
const SectionHeading = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-left: 1rem;
`

const ScrollRow = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 1rem;
`

const StyledLink = styled(Link)`
  min-width: 14rem;
  &:hover {
    text-decoration: none;
  }
`

const StyledCard = styled(Card)`
  width: 14rem;
`

const CardTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleLine = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const DetailLine = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
`

const NoCoursesMsg = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  padding: 1rem;
`
