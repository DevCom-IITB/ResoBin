import {
  ChatAlt,
  Calendar,
  DocumentText,
} from '@styled-icons/heroicons-outline'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import { Tabs, ButtonSwitch } from 'components/shared'
import { ButtonSquareLink } from 'components/shared/Buttons/ButtonSquare'
import { coursePageUrl } from 'paths'
import { selectCourseSlotsByCourseCode } from 'store/courseSlice'
import { selectTimetableStatus, updateTimetable } from 'store/userSlice'

import CourseWorkload from './CourseWorkload'

const SemesterItem = ({ courseCode, semester }) => {
  const dispatch = useDispatch()
  const status = useSelector(selectTimetableStatus({ courseCode, semester }))
  const handleClick = () => dispatch(updateTimetable({ courseCode, semester }))

  return (
    <ButtonSwitch
      active={status ? 1 : 0}
      icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
      onClick={handleClick}
      style={{ margin: '0.75rem 0 1rem', width: '100%' }}
    >
      {status ? 'Remove' : 'Add to timetable'}
    </ButtonSwitch>
  )
}

// ? semester = ['autumn', 'spring']
const CourseItemSub = ({ courseData }) => {
  const { code, workload, title } = courseData
  const isRunning = useSelector(selectCourseSlotsByCourseCode(code))
  const reviewCount = courseData?.reviews?.length
  const resourceCount = courseData?.resources?.length

  const semTabInitialValue = isRunning ? 'autumn' : null

  return (
    <>
      {semTabInitialValue ? (
        <Tabs
          tabheight="1.75rem"
          tabwidth="5rem"
          defaultActiveKey={semTabInitialValue}
        >
          <Tabs.TabPane key="autumn" tab="Autumn" disabled={!isRunning}>
            <SemesterItem courseCode={code} semester="autumn" />
          </Tabs.TabPane>

          <Tabs.TabPane key="spring" tab="Spring" disabled={false}>
            <SemesterItem semester="spring" />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Title style={{ marginBottom: '1rem', opacity: 0.8 }}>
          Timetable entry not found
        </Title>
      )}

      <CourseWorkload workload={workload} />

      <ButtonSquareLink
        to={`${coursePageUrl(code, title)}#reviews`}
        style={{ marginBottom: '0.75rem' }}
      >
        <ChatAlt size="18" style={{ marginRight: '0.5rem' }} />
        Reviews ({reviewCount})
      </ButtonSquareLink>

      <ButtonSquareLink to={`${coursePageUrl(code, title)}#resources`}>
        <DocumentText size="18" style={{ marginRight: '0.5rem' }} />
        Resources ({resourceCount})
      </ButtonSquareLink>
    </>
  )
}

export default CourseItemSub

const Title = styled.span`
  display: block;
  margin: 0 0.25rem 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`
