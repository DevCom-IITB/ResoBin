import {
  ChatAlt,
  Calendar,
  ChevronDown,
  DocumentText,
  Flag,
  Plus,
} from '@styled-icons/heroicons-outline'
import { Button, Dropdown, Menu } from 'antd'
import { lighten } from 'polished'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import { Tabs } from 'components/shared'
import { coursePageUrl } from 'paths'
import { selectCourseSlotsByCourseCode } from 'store/courseSlice'
import { selectTimetableStatus, updateTimetable } from 'store/userSlice'

import CourseWorkload from './CourseWorkload'

const SemesterItem = ({ courseCode, semester }) => {
  const dispatch = useDispatch()
  const status = useSelector(selectTimetableStatus({ courseCode, semester }))
  const handleClick = () => dispatch(updateTimetable({ courseCode, semester }))

  return (
    <StyledButton
      type="primary"
      active={status}
      icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
      onClick={handleClick}
    >
      {status ? 'Remove' : 'Add to timetable'}
    </StyledButton>
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
        if (requestReviewCount === 0) setRequestReviewCount((e) => e + 1)
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

      <StyledDropdown icon={<ChevronDown size="18" />} overlay={menu}>
        <Link to={`${coursePageUrl(code, title)}#reviews`}>
          <ChatAlt size="18" style={{ marginRight: '0.5rem' }} />
          Reviews ({reviewCount})
        </Link>
      </StyledDropdown>

      <StyledDropdown icon={<ChevronDown size="18" />} overlay={menu}>
        <Link to={`${coursePageUrl(code, title)}#resources`}>
          <DocumentText size="18" style={{ marginRight: '0.5rem' }} />
          Resources ({resourceCount})
        </Link>
      </StyledDropdown>
    </>
  )
}

export default CourseItemSub

const ButtonStyles = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.75rem;
  padding-left: 1rem;
  border: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};

  &:active,
  &:focus {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.darksecondary};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => lighten(0.4, theme.darksecondary)};
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  }
`

const StyledDropdown = styled(Dropdown.Button)`
  width: 100%;
  margin-top: 0.5rem;

  .ant-btn {
    ${ButtonStyles}

    &:first-child:not(:last-child) {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
  }

  .ant-dropdown-trigger {
    display: flex;
    justify-content: center;
    width: 2rem;
    padding: 0;

    &:last-child:not(:first-child) {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
`

const StyledButton = styled(Button)`
  ${ButtonStyles}

  padding: 0 1rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;

  &.ant-btn-primary {
    margin-bottom: 1rem;
    background-color: ${({ active, theme }) =>
      lighten(active ? 0.4 : 0, theme.darksecondary)};

    &:hover {
      background: ${({ active, theme }) =>
        lighten(active ? 0.45 : 0.4, theme.darksecondary)};
    }
  }
`

const Title = styled.span`
  display: block;
  margin: 0 0.25rem 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`
