import {
  ChatAlt,
  Calendar,
  DocumentText,
} from '@styled-icons/heroicons-outline'
import { Dropdown, Menu } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API } from 'api'
import { Tabs, ButtonSwitch } from 'components/shared'
import { ButtonSquareLink } from 'components/shared/Buttons'
import { coursePageUrl } from 'paths'
import { selectAllTimetable } from 'store/userSlice'

import CourseWorkload from './CourseWorkload'

const SemesterItem = ({ value }) => {
  const dispatch = useDispatch()
  const userTimetable = useSelector(selectAllTimetable)

  const [loading, setLoading] = useState(false)

  const status = userTimetable.reduce(
    (previousValue, currentValue, currentIndex) =>
      currentValue.id === value.id ? currentIndex : previousValue,
    -1
  )

  const handleClick = (id) => async () => {
    try {
      setLoading(true)
      if (status !== -1) await API.profile.timetable.remove({ id })
      else await API.profile.timetable.add({ id })

      // dispatch(updateTimetable())
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return value.length > 1 ? (
    <Dropdown
      overlay={
        <Menu theme="dark">
          {value.map(({ id, division }) => (
            <Menu.Item key={id} onClick={handleClick(id)}>
              <span>{division}</span>
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={['click']}
    >
      <ButtonSwitch
        active={status !== -1}
        icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
        loading={loading}
        style={{ margin: '0.75rem 0 1rem', width: '100%' }}
      >
        {status !== -1 ? 'Remove' : 'Timetable'}
      </ButtonSwitch>
    </Dropdown>
  ) : (
    <ButtonSwitch
      active={status !== -1}
      icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
      onClick={handleClick(value.id)}
      loading={loading}
      style={{ margin: '0.75rem 0 1rem', width: '100%' }}
    >
      {status !== -1 ? 'Remove' : 'Timetable'}
    </ButtonSwitch>
  )
}

const currentSeason = 'autumn'

// ? semester = ['autumn', 'spring']
const CourseItemSub = ({ courseData }) => {
  const timetable = {
    autumn: courseData.semester.find(({ season }) => season === 'autumn')
      .timetable,
    spring: courseData.semester.find(({ season }) => season === 'spring')
      .timetable,
  }

  const reviewCount = courseData?.reviews?.length
  const resourceCount = courseData?.resources?.length

  let semTabInitialValue = currentSeason
  if (!timetable.spring.length && !timetable.autumn.length)
    semTabInitialValue = null
  else if (!timetable.autumn.length) semTabInitialValue = 'spring'

  return (
    <>
      {semTabInitialValue ? (
        <Tabs
          tabheight="1.75rem"
          tabwidth="5rem"
          defaultActiveKey={semTabInitialValue}
        >
          <Tabs.TabPane
            key="autumn"
            tab="Autumn"
            disabled={!timetable.autumn.length}
          >
            <SemesterItem semester="autumn" value={timetable.autumn} />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="spring"
            tab="Spring"
            disabled={!timetable.spring.length}
          >
            <SemesterItem semester="spring" value={timetable.spring} />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Title style={{ marginBottom: '1rem', opacity: 0.8 }}>
          Timetable entry not found
        </Title>
      )}

      <CourseWorkload workload={courseData.workload} />

      <ButtonSquareLink
        to={`${coursePageUrl(courseData.code, courseData.title)}#reviews`}
        style={{ marginBottom: '0.75rem' }}
      >
        <ChatAlt size="18" style={{ marginRight: '0.5rem' }} />
        Reviews ({reviewCount})
      </ButtonSquareLink>

      <ButtonSquareLink
        to={`${coursePageUrl(courseData.code, courseData.title)}#resources`}
      >
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
