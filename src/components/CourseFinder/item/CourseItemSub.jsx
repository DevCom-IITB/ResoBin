import {
  ChatAlt,
  Calendar,
  ChevronDown,
  DocumentText,
  Flag,
  Plus,
} from '@styled-icons/heroicons-outline'
import { Menu } from 'antd'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Tabs } from 'components/shared'
import { ButtonDropdown, ButtonSwitch } from 'components/shared/Buttons/Button'
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
      type="primary"
      active={status}
      icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
      onClick={handleClick}
    >
      {status ? 'Remove' : 'Add to timetable'}
    </ButtonSwitch>
  )
}

// ? semester = ['autumn', 'spring']
const CourseItemSub = ({ courseData }) => {
  const { Code: code, Structure: structure, Title: title } = courseData
  const isRunning = useSelector(selectCourseSlotsByCourseCode(code))
  const reviewCount = 2
  const resourceCount = 2

  const semTabInitialValue = isRunning ? 'autumn' : null

  const [requestReviewCount, setRequestReviewCount] = useState(0)

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'request':
        if (requestReviewCount === 0) setRequestReviewCount((v) => v + 1)
        break

      case 'create':
        break

      default:
        break
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="request" icon={<Flag size="16" />}>
        Request
      </Menu.Item>
      <Menu.Item key="create" icon={<Plus size="16" />}>
        Create
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      {semTabInitialValue ? (
        <Tabs
          tabHeight="1.75rem"
          tabWidth="5rem"
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

      <CourseWorkload workload={structure} />

      <ButtonDropdown icon={<ChevronDown size="18" />} overlay={menu}>
        <Link to={`${coursePageUrl(code, title)}#reviews`}>
          <ChatAlt size="18" style={{ marginRight: '0.5rem' }} />
          Reviews ({reviewCount})
        </Link>
      </ButtonDropdown>

      <ButtonDropdown icon={<ChevronDown size="18" />} overlay={menu}>
        <Link to={`${coursePageUrl(code, title)}#resources`}>
          <DocumentText size="18" style={{ marginRight: '0.5rem' }} />
          Resources ({resourceCount})
        </Link>
      </ButtonDropdown>
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
