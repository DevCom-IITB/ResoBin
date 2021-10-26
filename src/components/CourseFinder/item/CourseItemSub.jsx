import {
  Calendar,
  ChatAlt,
  ChevronDown,
  DocumentText,
} from '@styled-icons/heroicons-outline'
import { Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API } from 'api'
import { Tabs, ButtonSwitch } from 'components/shared'
import { ButtonSquareLink } from 'components/shared/Buttons'
import { toastError } from 'components/toast'
import { coursePageUrl } from 'helpers/format'
import { selectAllTimetable, updateTimetable } from 'store/userSlice'

import CourseWorkload from './CourseWorkload'

const SemesterItem = ({ data }) => {
  const dispatch = useDispatch()
  const userTimetableList = useSelector(selectAllTimetable)

  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const timetableContains = (list, item) =>
      list.reduce(
        (accumulator, value) => (value === item.id ? item : accumulator),
        null
      )

    // ? selected = null if nothing is selected
    // ? else selected is the index of selected option
    setSelected(
      data.reduce(
        (accumulator, value) =>
          timetableContains(userTimetableList, value) ?? accumulator,
        null
      )
    )
  }, [userTimetableList, data])

  const handleClick = (id) => async () => {
    try {
      setLoading(true)
      if (selected) await API.profile.timetable.remove({ id })
      else await API.profile.timetable.add({ id })
      dispatch(updateTimetable(id))
    } catch (error) {
      toastError(error)
    } finally {
      setLoading(false)
    }
  }

  return data.length > 1 && selected === null ? (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu theme="dark">
          {data.map(({ id, division }) => (
            <Menu.Item key={id} onClick={handleClick(id)}>
              {division}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <ButtonSwitch
        type="primary"
        $active={selected !== null}
        icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
        loading={loading}
        style={{ margin: '0.75rem 0 1rem', width: '100%' }}
      >
        {selected !== null ? (
          `Remove ${selected.division}`
        ) : (
          <>
            Timetable
            <ChevronDown size="16" style={{ marginLeft: '1rem' }} />
          </>
        )}
      </ButtonSwitch>
    </Dropdown>
  ) : (
    <ButtonSwitch
      type="primary"
      $active={selected !== null}
      icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
      onClick={handleClick(selected ? selected.id : data[0].id)}
      loading={loading}
      style={{ margin: '0.75rem 0 1rem', width: '100%' }}
    >
      {selected !== null ? `Remove ${selected.division}` : 'Timetable'}
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
            <SemesterItem semester="autumn" data={timetable.autumn} />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="spring"
            tab="Spring"
            disabled={!timetable.spring.length}
          >
            <SemesterItem semester="spring" data={timetable.spring} />
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
