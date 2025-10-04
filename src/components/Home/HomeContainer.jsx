import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { toast } from 'components/shared'
import { PageTitle } from 'components/shared/Layout'
import { API } from 'config/api'
import { coursePageUrl } from 'helpers'
import { selectSemesters } from 'store/courseSlice'
import { selectUserProfile } from 'store/userSlice'

import Sidebar from './sidebar'


const CoursesThisSemester = () => {
  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [coursedata, setCoursedata] = useState({})
  const [loading, setLoading] = useState(false)

  const semesterList = useSelector(selectSemesters)
  const [semIdx, setSemIdx] = useState(null)

  const [activeTab, setActiveTab] = useState('current');

  const [favCourseData, setFavCourseData] = useState([]);

  useEffect(() => {
    const fetchFavCourses = async () => {
      try {
        setLoading(true);
        const response = await API.profile.favorites();
        setFavCourseData(response.results);
      } catch (error) {
        toast({ status: 'error', content: error });
      } finally {
        setLoading(false);
      }
    };

    fetchFavCourses();
  }, []);


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
      <TopBar>
        <TotalCredits>
          Total Credits:{' '}
          {Object.values(coursedata).reduce((sum, course) => sum + (course?.credits || 0), 0)}
        </TotalCredits>
      </TopBar>

      <OuterContainer>
        <TabBar>
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
        </TabBar>

        <DividerLine />

        {activeTab === 'current' ? (
          <ScrollRow>
            {courseTimetableList.length === 0 && !loading ? (
              <NoCoursesMsg>No Courses this semester yet!</NoCoursesMsg>
            ) : (
              courseTimetableList.map(({ id, course, professor }) => {
                const courseData = coursedata[course];
                if (!courseData) return null;

                const { code, credits } = courseData;

                return (
                  <StyledLink key={id} to={coursePageUrl(code)}>
                    <StyledCard>
                      <CardTitleRow>{code}</CardTitleRow>
                      <DetailLine>
                        <ProfTag>{professor ? `Prof. ${professor}` : 'No Instructor'}</ProfTag>
                      </DetailLine>
                      <DetailLine>Total Credits: {credits}</DetailLine>
                    </StyledCard>
                  </StyledLink>
                );
              })
            )}
          </ScrollRow>
        ) : (
          <ScrollRow>
            {favCourseData.length === 0 ? (
              <NoCoursesMsg>No Saved Courses yet!</NoCoursesMsg>
            ) : (
              favCourseData.map((course) => {
                const professor = courseTimetableList.find(item => item.course === course.code)?.professor || null;
                return(
                  <StyledLink key={course.code} to={coursePageUrl(course.code)}>
                    <StyledCard>
                      <CardTitleRow>{course.code}</CardTitleRow>
                      <DetailLine>
                        <ProfTag>{professor ? `Prof. ${professor}` : 'No Instructor'}</ProfTag>
                      </DetailLine>
                      <DetailLine>Total Credits: {course.credits}</DetailLine>
                    </StyledCard>
                  </StyledLink>
                )
              })
            )}
          </ScrollRow>
        )}
      </OuterContainer>
    </>
  );
}

const HomeContainer = () => {
  const profile = useSelector(selectUserProfile)
  return (
    <Container>
      {/* Main content */}
      <MainContent>
        <PageTitle
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginTop: '1rem',
            marginLeft: '1rem',
            lineHeight: '1.2',
            wordWrap: 'break-word',
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
        <CoursesThisSemester />
      </MainContent>

      {/* Aside-like sidebar */}
      <AsideContainer>
        <Sidebar />
      </AsideContainer>
    </Container>
  )
}

export default HomeContainer

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
`;

const TotalCredits = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  color: white;
`;

const OuterContainer = styled.div`
  width: 100%;
  background-color: #2b273b;
  padding: 0.75rem 1rem;
`;

const TabBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Tab = styled.button`
  background-color: ${({ active }) => (active ? '#000000' : '#2b273b')};
  color: ${({ active }) => (active ? '#FFFFFF' : '#b0aecd')};
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border: none;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.25rem 0.5rem;
  }
  `;


const DividerLine = styled.hr`
  border: none;
  border-top: 1px solid #3e3e60;
  margin: 0.4rem 0 0.75rem 0;
`;

const ScrollRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.6rem;
  padding-bottom: 0.5rem;
  padding: 0.5rem 0.25rem 0.5rem 0; /* Add right spacing */
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #3e3e60;
    border-radius: 4px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledCard = styled.div`
  background-color: #1e1e2f;
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 110px;
  color: white;
  font-size: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
`;

const CardTitleRow = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ProfTag = styled.span`
  display: inline-block;
  background-color: #3e3e60;
  padding: 0.2rem 0.5rem;
  font-size: 0.65rem;
  border-radius: 999px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailLine = styled.div`
  font-size: 0.7rem;
  color: #bbb;
  margin-top: 0.25rem;
`;

const NoCoursesMsg = styled.div`
  font-size: 0.85rem;
  color: #bbb;
  padding: 0.5rem;
`;

// Layout styled components
const Container = styled.div`
  display: flex;
  background-color: #130d1d;
  min-height: 100vh;
  gap: 0;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  padding-right: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

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

  @media (max-width: 1024px) {
    position: relative;
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 1px solid #2a2636;
    box-shadow: none;
  }
`;