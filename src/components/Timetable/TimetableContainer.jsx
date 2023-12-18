import { LoadingOutlined } from '@ant-design/icons'
import { ChevronLeft, ChevronRight, X } from '@styled-icons/heroicons-outline'
import { Spin, Alert } from 'antd'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import {
  Aside,
  Card,
  LoaderAnimation,
  PageHeading,
  PageTitle,
  toast,
} from 'components/shared'
import { ButtonIcon, ButtonIconDanger } from 'components/shared/Buttons'
import { API } from 'config/api'
import { slots } from 'data/timetable'
import { displayYear, coursePageUrl } from 'helpers'
import { useQueryString } from 'hooks'
import { selectCourseAPILoading, selectSemesters } from 'store/courseSlice'
import { updateTimetable } from 'store/userSlice'

import CurrentTime from './CurrentTime'
import HalfSemCourseItem from './halfSemCourseItem'
import TimetableCourseItem from './TimetableCourseItem'
import TimetableDownloadLink from './TimetableDownloadLink'
import TimetableLayout from './TimetableLayout'
import TimetableSearch from './TimetableSearch'
import TimetableShareButton from './TimetableShareButton'

const TimetableAsideItem = ({ course, handleRemove, loading }) => {
  const { code, title, credits } = course ?? {}

  return (
    <StyledLink to={coursePageUrl(code, title)}>
      <Card hoverable>
        <Card.Meta
          title={
            <TimetableCardTitle>
              {code}

              <ButtonIconDanger
                tooltip="Remove from timetable"
                icon={<X size="24" />}
                onClick={handleRemove}
                disabled={loading}
                hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
              />
            </TimetableCardTitle>
          }
          description={
            <>
              <span>{title}</span>
              <br />
              <span>Credits: {credits}</span>
            </>
          }
        />
      </Card>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

let ajaxRequest = null
const TimetableContainer = () => {
  const dispatch = useDispatch()
  const semesterList = useSelector(selectSemesters)
  const courseAPILoading = useSelector(selectCourseAPILoading)

  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [courseData, setCourseData] = useState([])
  const [coursedata, setCoursedata] = useState({})
  const [loading, setLoading] = useState(courseAPILoading)
  const [semIdx, setSemIdx] = useState(null)

  const { getQueryString } = useQueryString()

  const [loadingg, setLoadingg] = useState(true)

  const fetchCourses = async (params) => {
    setLoadingg(true)

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

    setLoadingg(false)
  }

  useEffect(() => {
    const filter = getQueryString()
    const params = {
      search_fields: 'code,title,description',
      q: filter.q,
    }

    fetchCourses(params)
  }, [getQueryString])

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
    if (semIdx !== null) fetchUserTimetable(semesterList[semIdx])
    else setLoading(true)
  }, [fetchUserTimetable, semesterList, semIdx])

  const handleClickPrev = () =>
    semIdx - 1 in semesterList && setSemIdx(semIdx - 1)
  const handleClickNext = () =>
    semIdx + 1 in semesterList && setSemIdx(semIdx + 1)

  const removeFromTimetable = (id) => async () => {
    try {
      setLoading(true)
      await API.profile.timetable.remove({ id })

      setCourseTimetableList(
        courseTimetableList.filter((item) => item.id !== id)
      )
      dispatch(updateTimetable(id))
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  const addToTimetable = async (code, id) => {
    if (id === -1) {
      toast({
        status: 'error',
        content: `No TimeTable Found For ${code} for current semester`,
      })
    } else {
      try {
        await API.profile.timetable.add({ id })
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        fetchUserTimetable(semesterList[semIdx])
      }
    }
  }

  const getCourseList = () => {
    const courseList = courseTimetableList.map((item) => item.course)
    return courseList
  }

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true)
        const courseList = getCourseList()
        const promises = courseList.map(async (course) => {
          const response = await API.courses.read({ code: course })
          return response
        })
        const courseDataArray = await Promise.all(promises)
        const courseDataObj = {}
        courseDataArray.forEach((course) => {
          courseDataObj[course.code] = course
        })
        setCoursedata(courseDataObj)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        // <<<<<<< fix/no-refresh-on-course-add
        //         setLoading(false);
        //       }
        //     };

        //     fetchCourseData();
        //   }, [courseTimetableList]);

        //   const filteredCourseData = coursedata.filter((course) => {
        //     return course.isHalfSemester === true;
        //   });

        // const groupCoursesByLectureSlot = (courses) => {
        //   const groupedCourses = courses.reduce((acc, course) => {
        //     course.lectureSlots.forEach((lectureSlot) => {
        //       if (!acc.has(lectureSlot)) {
        //         acc.set(lectureSlot, new Set([course.code]));
        //       } else {
        //         acc.get(lectureSlot).add(course.code);
        // =======
        setLoading(false)
        // >>>>>>> DOPE
      }
    }

    fetchCourseData()
  }, [courseTimetableList])

  const filteredCourseData = Object.values(coursedata).filter((course) => {
    return course.isHalfSemester === true
  })

  const groupCoursesByLectureSlot = (courses) => {
    const groupedCourses = courses.reduce((acc, course) => {
      course.lectureSlots.forEach((lectureSlot) => {
        if (!acc.has(lectureSlot)) {
          acc.set(lectureSlot, new Set([course.code]))
        } else {
          acc.get(lectureSlot).add(course.code)
        }
      })
      return acc
    }, new Map())
    groupedCourses.forEach((value, key, map) => {
      map.set(key, Array.from(value))
    })

    return Object.fromEntries(groupedCourses)
  }

  const halfSemCourses = filteredCourseData.map((course) => {
    const { code, semester } = course
    const lectureSlots = semester.flatMap((sem) =>
      sem.timetable.flatMap((slot) => slot.lectureSlots)
    )
    const tutorialSlots = semester.flatMap((sem) =>
      sem.timetable.flatMap((slot) => slot.tutorialSlots)
    )
    return { code, lectureSlots, tutorialSlots }
  })
  const groupedCoursesData = Object.entries(
    groupCoursesByLectureSlot([...halfSemCourses])
  )

  const getSlotClashes = () => {
    const courseAndSlotList = []
    courseTimetableList.forEach(({ course, lectureSlots }) => {
      lectureSlots.forEach((lecSlot) => {
        courseAndSlotList.push({
          course,
          slotName: lecSlot,
        })
      })
    })
    const courseTimetableSlots = courseAndSlotList
      .map(({ course, slotName }) => ({
        course,
        slotName,
        grid: slots[slotName],
      }))
      .sort(
        (a, b) =>
          a.grid.col * 1000 +
          a.grid.row.start -
          (b.grid.col * 1000 + b.grid.row.start)
      )
    const clashes = []
    for (let i = 1; i < courseTimetableSlots.length; i += 1) {
      const prev = courseTimetableSlots[i - 1]
      const next = courseTimetableSlots[i]
      if (
        prev.grid.col === next.grid.col &&
        prev.grid.row.end > next.grid.row.start
      )
        clashes.push({
          first: courseTimetableSlots[i - 1],
          second: courseTimetableSlots[i],
        })
    }
    return clashes
  }

  const slotClashWarnings = (clashes) => {
    const warnings = []
    if (Array.isArray(halfSemCourses)) {
      clashes.forEach((clash) => {
        const { first } = clash
        const { second } = clash
        const FirstCourseHalfSem = halfSemCourses.some(
          (course) => course.code === first.course
        )
        const SecondCourseHalfSem = halfSemCourses.some(
          (course) => course.code === second.course
        )

        if (!FirstCourseHalfSem || !SecondCourseHalfSem) {
          warnings.push(
            `${first.course} (Slot ${first.slotName}) is clashing with ${second.course} (Slot ${second.slotName})`
          )
        }
      })
    }
    return warnings
  }

  const warnings = slotClashWarnings(getSlotClashes())

  return (
    <>
      <PageHeading>
        <PageTitle>Timetable</PageTitle>
      </PageHeading>
      {semesterList[semIdx] && (
        <TimetableSemesterHeader>
          <TimetableDownloadLink coursesInTimetable={courseTimetableList} />

          <TimetableSemesterTitle>
            <ButtonIcon
              icon={<ChevronLeft size="20" />}
              onClick={handleClickPrev}
              disabled={loading || !(semIdx - 1 in semesterList)}
              hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />
            {semesterList[semIdx].season}&nbsp;
            {displayYear(semesterList[semIdx])}
            <ButtonIcon
              icon={<ChevronRight size="20" />}
              disabled={loading || !(semIdx + 1 in semesterList)}
              onClick={handleClickNext}
              hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />
          </TimetableSemesterTitle>

          <TimetableShareButton coursesInTimetable={courseTimetableList} />
        </TimetableSemesterHeader>
      )}
      <TimetableSearch
        loading={loadingg}
        setLoading={setLoadingg}
        data={courseData}
        addToTimetable={addToTimetable}
      />
      {loading && <LoaderAnimation />}
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <TimetableLayout>
          {courseTimetableList.map((item) =>
            halfSemCourses.some(
              (course) => course.code === item.course
            ) ? null : (
              <TimetableCourseItem key={item.id} data={item} />
            )
          )}
          {groupedCoursesData.map(([key, courses]) => (
            <HalfSemCourseItem keyProp={key} data={courses} />
          ))}

          <CurrentTime mode="vertical" />
        </TimetableLayout>
      </Spin>
      <Aside title="My courses" loading={loading}>
        <CoursesListInfo>
          Total credits:{' '}
          {Object.values(coursedata).reduce(
            (acc, course) => acc + course.credits,
            0
          )}
        </CoursesListInfo>
        <ClashAlerts>
          {!loading &&
            warnings.map((warning) => (
              <Alert
                message="Warning"
                description={warning}
                type="warning"
                showIcon
                closable
              />
            ))}
        </ClashAlerts>

        <AsideList>
          {!loading &&
            courseTimetableList.map(({ id, course }) => (
              <TimetableAsideItem
                key={id}
                course={coursedata[course]}
                handleRemove={removeFromTimetable(id)}
                loading={loading}
              />
            ))}
        </AsideList>
      </Aside>
    </>
  )
}

export default TimetableContainer

const TimetableSemesterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const TimetableSemesterTitle = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  text-transform: capitalize;
`

const AsideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 13.6rem;
`

const TimetableCardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CoursesListInfo = styled.span`
  margin-top: 1rem;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`

const ClashAlerts = styled.div`
  margin-top: 1rem;
`
