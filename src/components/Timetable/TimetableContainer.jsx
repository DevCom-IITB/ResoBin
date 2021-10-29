import { LoadingOutlined } from '@ant-design/icons'
import { ChevronLeft, ChevronRight } from '@styled-icons/heroicons-outline'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API } from 'api'
import { Aside, ButtonIcon, LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
import { displayYear } from 'helpers/format'
import { selectSemesters } from 'store/courseSlice'

import CurrentTime from './CurrentTime'
import TimetableCourseItem from './TimetableCourseItem'
import TimetableLayout from './TimetableLayout'

const TimetableContainer = () => {
  const semesterList = useSelector(selectSemesters)

  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [loading, setLoading] = useState(false)
  const [semIdx, setSemIdx] = useState(semesterList.length - 1)

  useEffect(() => {
    const fetchUserTimetable = async (_semester) => {
      try {
        setLoading(true)
        const response = await API.profile.timetable.read(_semester)
        setCourseTimetableList(response)
      } catch (error) {
        toastError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserTimetable(semesterList[semIdx])
  }, [semesterList, semIdx])

  const handleClickPrev = () =>
    semIdx - 1 in semesterList && setSemIdx(semIdx - 1)
  const handleClickNext = () =>
    semIdx + 1 in semesterList && setSemIdx(semIdx + 1)

  return (
    <>
      <TimetableSemesterTitle>
        <ButtonIcon
          color="white"
          size="default"
          icon={<ChevronLeft size="20" />}
          onClick={handleClickPrev}
          disabled={loading || !(semIdx - 1 in semesterList)}
          hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
        />
        {semesterList[semIdx]?.season}&nbsp;
        {displayYear(semesterList[semIdx]?.year)}
        <ButtonIcon
          color="white"
          size="default"
          icon={<ChevronRight size="20" />}
          disabled={loading || !(semIdx + 1 in semesterList)}
          onClick={handleClickNext}
          hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
        />
      </TimetableSemesterTitle>

      {loading && <LoaderAnimation />}

      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <TimetableLayout>
          {courseTimetableList.map((item, idx) => (
            <TimetableCourseItem key={item.id} colorCode={idx} data={item} />
          ))}

          <CurrentTime mode="vertical" />
        </TimetableLayout>
      </Spin>

      <Aside title="Semester courses" loading={loading}>
        {!loading &&
          courseTimetableList.map(({ id, course }) => (
            <h1 key={id}>{course}</h1>
          ))}
      </Aside>
    </>
  )
}

export default TimetableContainer

const TimetableSemesterTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
  font-size: 1.25rem;
  color: white;
  text-transform: capitalize;
`
