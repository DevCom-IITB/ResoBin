import { Calendar, ChevronDown } from '@styled-icons/heroicons-outline'
import { Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { ButtonSwitch, Tabs, toast } from 'components/shared'
import { API } from 'config/api'
import { selectCurrentSemester } from 'store/courseSlice'
import { selectAllTimetable, updateTimetable } from 'store/userSlice'

// ? semester = ['autumn', 'spring']
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
      if (selected) {
        await API.profile.timetable.remove({ id })
      } else {
        await API.profile.timetable.add({ id })
      }

      dispatch(updateTimetable(id))
    } catch (error) {
      toast({ status: 'error', content: error })
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
        icon={<Calendar size="16" />}
        loading={loading}
        style={{ margin: '0.75rem 0 0', width: '100%' }}
      >
        {selected !== null ? (
          `Remove ${selected.division}`
        ) : (
          <SpaceBetween>
            Timetable
            <ChevronDown size="16" />
          </SpaceBetween>
        )}
      </ButtonSwitch>
    </Dropdown>
  ) : (
    <ButtonSwitch
      type="primary"
      $active={selected !== null}
      icon={<Calendar size="16" />}
      onClick={handleClick(selected ? selected.id : data[0].id)}
      loading={loading}
      style={{ margin: '0.75rem 0 0', width: '100%' }}
    >
      {selected !== null ? (
        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
          Remove from: <b>{selected.division}</b>
        </span>
      ) : (
        'Timetable'
      )}
    </ButtonSwitch>
  )
}

const semesters = ['autumn', 'spring']

const TimetableSelector = ({ semester }) => {
  const latestSemester = useSelector(selectCurrentSemester)
  const timetable = semesters.reduce(
    (accumulator, value) => ({
      ...accumulator,
      [value]: semester.find(({ season }) => season === value)?.timetable ?? [],
    }),
    {}
  )

  if (!timetable.spring.length && !timetable.autumn.length)
    return (
      <Title style={{ margin: 0, opacity: 0.8 }}>
        Timetable entry not found
      </Title>
    )

  let semTabInitialValue = latestSemester?.season
  if (!timetable[semTabInitialValue].length)
    semTabInitialValue = semesters.find((sem) => sem !== semTabInitialValue)

  return (
    <Tabs
      tabheight="1.75rem"
      tabwidth="6.5rem"
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
  )
}

export default TimetableSelector

const Title = styled.p`
  display: block;
  margin: 0 0.25rem 0.25rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  font-size: 0.75rem;
  letter-spacing: 1.5px;
`

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
