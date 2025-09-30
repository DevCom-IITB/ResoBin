import axios from 'axios'
import React, { useState, useCallback, useEffect } from 'react'
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import uploadIcon from 'assets/svgs/cloud-upload-white.svg'
import { toast } from 'components/shared'
import { PageTitle } from 'components/shared/Layout'
import { API } from 'config/api'
import { coursePageUrl } from 'helpers'
import { selectSemesters } from 'store/courseSlice'
import { selectUserProfile } from 'store/userSlice'

import QuickActions from './QuickActions'
import SearchBar from './SearchBar'
import Sidebar from './sidebar'

const CoursesThisSemester = () => {
  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [coursedata, setCoursedata] = useState({})
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const COURSES_PER_PAGE = 5

  const semesterList = useSelector(selectSemesters)
  const [semIdx, setSemIdx] = useState(null)
  const [activeTab, setActiveTab] = useState('current')
  const [favCourseData, setFavCourseData] = useState([])

  useEffect(() => {
    const fetchFavCourses = async () => {
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
    fetchFavCourses()
  }, [])

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

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0))
  const handleNextPage = (total) =>
    setPage((prev) =>
      prev + 1 < Math.ceil(total / COURSES_PER_PAGE) ? prev + 1 : prev
    )

  useEffect(() => {
    setPage(0) // reset page when tab changes
  }, [activeTab])

  const courses = activeTab === 'current' ? courseTimetableList : favCourseData

  return (
    <>
      <TabsRow
        style={{
          marginLeft: '1rem',
          justifyContent: 'space-between',
          width: '958.83px',
        }}
      >
        <TabsWrapper>
          <Tab
            active={activeTab === 'current'}
            onClick={() => setActiveTab('current')}
          >
            Courses this Semester
          </Tab>
          <Tab
            active={activeTab === 'saved'}
            onClick={() => setActiveTab('saved')}
          >
            Saved Courses
          </Tab>
        </TabsWrapper>

        <TotalCredits>
          Total Credits:{' '}
          {Object.values(coursedata).reduce(
            (sum, course) => sum + (course?.credits || 0),
            0
          )}
        </TotalCredits>
      </TabsRow>

      <CoursesWrapper>
        <OuterContainer>
          <ArrowSideButton onClick={handlePrevPage} disabled={page === 0}>
            &lt;
          </ArrowSideButton>

          <ScrollWrapper style={{ padding: '0 0.5rem' }}>
            <ScrollRow>
              {courses.length === 0 && !loading ? (
                <NoCoursesMsg>
                  {activeTab === 'current'
                    ? 'No Courses this semester yet!'
                    : 'No Saved Courses yet!'}
                </NoCoursesMsg>
              ) : (
                courses
                  .slice(page * COURSES_PER_PAGE, (page + 1) * COURSES_PER_PAGE)
                  .map((item) => {
                    if (activeTab === 'current') {
                      const { id, course } = item
                      const courseData = coursedata[course]
                      if (!courseData) return null
                      const { code, credits, semester } = courseData
                      return (
                        <StyledLink key={id} to={coursePageUrl(code)}>
                          <StyledCard>
                            <CardTitleRow>{code}</CardTitleRow>
                            <DetailLine>
                              <ProfTag>
                                {semester[0].timetable[0].professor
                                  ? `Prof. ${semester[0].timetable[0].professor}`
                                  : 'Unknown'}
                              </ProfTag>
                            </DetailLine>
                            <DetailLine>Credits: {credits}</DetailLine>
                          </StyledCard>
                        </StyledLink>
                      )
                    }
                    const { code, credits, semester } = item
                    if (!code) return null
                    const professor = semester[0]?.timetable[0]?.professor
                    return (
                      <StyledLink key={code} to={coursePageUrl(code)}>
                        <StyledCard>
                          <CardTitleRow>{code}</CardTitleRow>
                          <DetailLine>
                            <ProfTag>
                              {professor ? `Prof. ${professor}` : 'Unknown'}
                            </ProfTag>
                          </DetailLine>
                          <DetailLine>Credits: {credits}</DetailLine>
                        </StyledCard>
                      </StyledLink>
                    )
                  })
              )}
            </ScrollRow>
          </ScrollWrapper>

          <ArrowSideButton
            onClick={() => handleNextPage(courses.length)}
            disabled={page + 1 >= Math.ceil(courses.length / COURSES_PER_PAGE)}
          >
            &gt;
          </ArrowSideButton>
        </OuterContainer>
      </CoursesWrapper>
    </>
  )
}

let ajaxRequest = null
const TopReqCourses = () => {
  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const COURSES_PER_PAGE = 5
  const navigate = useNavigate()
  const redirectContribute = (code) => {
    navigate(`/contribute?course=${code}`)
  }

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0))
  const handleNextPage = (total) =>
    setPage((prev) =>
      prev + 1 < Math.ceil(total / COURSES_PER_PAGE) ? prev + 1 : prev
    )

  const fetchCourses = async (params) => {
    setLoading(true)
    try {
      if (ajaxRequest) ajaxRequest.cancel()
      ajaxRequest = axios.CancelToken.source()

      const response = await API.courses.list({
        params,
        cancelToken: ajaxRequest.token,
      })
      setCourseData(response.results)
    } catch (error) {
      if (axios.isCancel(error)) return
      toast({ status: 'error', content: error })
    }
    setLoading(false)
  }

  const fetchAllCourses = () => {
    fetchCourses({
      search_fields: 'code,title,description',
      q: '',
      ordering: '-resource_requesters_count_db',
      page_size: 100,
    })
  }

  useEffect(() => {
    fetchAllCourses()
  }, [])

  return (
    <CoursesWrapper style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <OuterContainer
        style={{
          height: '190.61px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderTopLeftRadius: '10px',
        }}
      >
        {/* Heading + Subheading */}
        <div style={{ padding: '0.75rem 1rem 0 1rem' }}>
          <h3 style={{ color: 'white', margin: 0 }}>
            Top Contribution Requests
          </h3>
          <div
            style={{
              color: '#b0aecd',
              fontSize: '0.7rem',
              marginTop: '0.3rem',
            }}
          >
            Contribute directly with just one click
          </div>
        </div>

        {/* Scrollable Row with Arrows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0.5rem 1rem 0.5rem 0rem',
          }}
        >
          <ArrowSideButton
            onClick={handlePrevPage}
            disabled={page === 0}
            style={{ width: '56px' }}
          >
            &lt;
          </ArrowSideButton>

          <ScrollWrapper style={{ padding: '0 0.5rem', flex: 1 }}>
            <ScrollRow>
              {courseData.length === 0 && !loading ? (
                <NoCoursesMsg>No Top Requested Courses found!</NoCoursesMsg>
              ) : (
                courseData
                  .slice(page * COURSES_PER_PAGE, (page + 1) * COURSES_PER_PAGE)
                  .map((course) => (
                    <StyledLink
                      key={course.code}
                      to={coursePageUrl(course.code)}
                    >
                      <StyledCard>
                        <CardBadge>{course.resourceRequestersCount}</CardBadge>
                        <CardTitleRow>{course.code}</CardTitleRow>
                        <DetailLine>
                          <ProfTag>
                            {course.semester[0].timetable[0]
                              ? `Prof. ${course.semester[0].timetable[0].professor}`
                              : 'Unknown'}
                          </ProfTag>
                        </DetailLine>
                        <UploadBox
                          onClick={(e) => {
                            e.preventDefault()
                            redirectContribute(course.code)
                          }}
                        >
                          <img
                            src={uploadIcon}
                            alt="Upload"
                            width={14}
                            height={14}
                          />
                        </UploadBox>
                      </StyledCard>
                    </StyledLink>
                  ))
              )}
            </ScrollRow>
          </ScrollWrapper>

          <ArrowSideButton
            onClick={() => handleNextPage(courseData.length)}
            disabled={
              page + 1 >= Math.ceil(courseData.length / COURSES_PER_PAGE)
            }
            style={{ width: '56px' }}
          >
            &gt;
          </ArrowSideButton>
        </div>
      </OuterContainer>
    </CoursesWrapper>
  )
}

const HomeContainer = () => {
  const profile = useSelector(selectUserProfile);
  const [loadingg, setLoadingg] = useState(false); // No longer needed for course fetching

  const addToTimetable = async (code, id) => {
    // copy your add logic from original TimetableContainer
    // or just leave a stub if not needed yet
    console.log("Add to timetable:", code, id);
  };

  return (
    <Container>
      <MainContent>
        <HeaderRow>
          <div>
            <WelcomeText>
              Welcome back, {profile?.name?.split(' ')?.[0]}!
            </WelcomeText>
            <Subtitle>Here&apos;s everything you need for today</Subtitle>
          </div>
          <SearchBar
            loading={loadingg}
            setLoading={setLoadingg}
          />
        </HeaderRow>

        <QuickActions />
        <CoursesThisSemester />
        <TopReqCourses />
      </MainContent>

      <AsideContainer>
        <Sidebar />
      </AsideContainer>
    </Container>
  )
}

export default HomeContainer

const TabsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 2.5rem;
`

const TotalCredits = styled.div`
  color: #d6c9f8;
  font-size: 15.22px;
  font-family: Montserrat;
  font-weight: 500;
  word-wrap: break-word;
  display: flex;
`

const TabsWrapper = styled.div`
  background-color: #000;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0;
  display: inline-flex;
  align-items: stretch; /* makes tabs take full height */
  width: fit-content;
  height: 40px; /* consistent height for bar + tab */
`

const Tab = styled.button`
  background-color: ${({ active }) => (active ? '#2B273B' : 'transparent')};
  color: ${({ active }) => (active ? '#FFFFFF' : '#b0aecd')};
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border: none;
  padding: 0.6rem 1.2rem; /* taller to fill black bar */
  border-top-left-radius: ${({ active }) => (active ? '10px' : '0')};
  border-top-right-radius: ${({ active }) => (active ? '10px' : '0')};
  border-bottom-left-radius: ${({ active }) => (active ? '0' : '0')};
  border-bottom-right-radius: ${({ active }) => (active ? '0' : '0')};
  cursor: pointer;
  transition: background-color 0.2s ease;
  height: 100%; /* match black bar height */
`

const OuterContainer = styled.div`
  width: 958.83px;
  height: 133.46px;
  background: #2b273b;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  align-items: center;
`

const ArrowSideButton = styled.button`
  background-color: #6d5dfc; /* blue */
  border: none;
  color: white;
  font-size: 1.2rem; /* ⬅ fixed arrow size */
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.4rem;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const TabBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const ScrollRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.6rem;
  padding-bottom: 0.5rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledCard = styled.div`
  position: relative;
  width: 160.4px;
  height: 93.66px;
  background: #231f31;
  border-radius: 7px;
  padding: 0.5rem;
  color: white;
  font-size: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  margin-top: 11px;
`

const CardTitleRow = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const ProfTag = styled.span`
  display: inline-block;
  background-color: #3e3e60;
  padding: 0.2rem 0.5rem;
  font-size: 0.65rem;
  border-radius: 999px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`

const DetailLine = styled.div`
  font-size: 0.7rem;
  color: #bbb;
  margin-top: 0.25rem;
`

const NoCoursesMsg = styled.div`
  font-size: 0.85rem;
  color: #bbb;
  padding: 0.5rem;
`

const ScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CoursesWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 958.83px;
  margin-left: 1rem;
`

const UploadBox = styled.button`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background-color: #2b273b;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  padding: 0;

  &:hover {
    background-color: #342f45; /* slight hover effect */
  }
`

const CardBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  background-color: #3e3e60; /* same as ProfTag */
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
`
// Layout styled components
const Container = styled.div`
  display: flex;
  backgroundcolor: #130d1d;
  min-height: 100vh;
  gap: 0;
`

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  padding-right: 1.5rem;
`

const AsideContainer = styled.aside`
  width: 320px;
  background-color: #1a1523;
  padding: 0;
  border-left: 1px solid #2a2636;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.2);
  color: white;
  z-index: 10;
`

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`

const WelcomeText = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
`

const Subtitle = styled.div`
  color: #b0aecd;
  font-size: 1rem;
  margin-top: 0.3rem;
`
