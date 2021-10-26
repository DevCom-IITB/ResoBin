import { ChevronLeft, ChevronRight } from '@styled-icons/heroicons-outline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API } from 'api'
import { ButtonIcon, LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
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

  return loading ? (
    <LoaderAnimation fixed />
  ) : (
    <>
      <Change>
        <ButtonIcon
          color="white"
          size="default"
          icon={<ChevronLeft size="20" />}
          onClick={() => setSemIdx(semIdx - 1)}
          disabled={semIdx === 0}
          hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
        />
        {semesterList[semIdx].season} {semesterList[semIdx].year}
        <ButtonIcon
          color="white"
          size="default"
          icon={<ChevronRight size="20" />}
          disabled={semIdx === semesterList.length - 1}
          onClick={() => setSemIdx(semIdx + 1)}
          hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
        />
      </Change>

      <TimetableLayout>
        {courseTimetableList.map((item, idx) => (
          <TimetableCourseItem key={item.id} colorCode={item.id} data={item} />
        ))}
        <CurrentTime mode="vertical" />
      </TimetableLayout>
    </>
  )
}

export default TimetableContainer

const Change = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  font-size: 1.75rem;
`
