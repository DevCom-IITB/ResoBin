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
import { CourseContentRequestButtonIcon } from 'components/CoursePage/CourseContentRequest'
import { ButtonSwitch, Divider, Tabs, toast } from 'components/shared'
import { ButtonSquareLink } from 'components/shared/Buttons'
import { coursePageUrl } from 'helpers/format'
import { useResponsive } from 'hooks'
import { selectCurrentSemester } from 'store/courseSlice'
import { selectAllTimetable, updateTimetable } from 'store/userSlice'

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
        icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
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
      icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
      onClick={handleClick(selected ? selected.id : data[0].id)}
      loading={loading}
      style={{ margin: '0.75rem 0 0', width: '100%' }}
    >
      {selected !== null ? `Remove ${selected.division}` : 'Timetable'}
    </ButtonSwitch>
  )
}

// TODO: Improve responsiveness
// ? semester = ['autumn', 'spring']
const CourseItemSub = ({ courseData }) => {
  const { isMobile, isMobileS } = useResponsive()

  const { code, title, semester, reviews, resources } = courseData
  const latestSemester = useSelector(selectCurrentSemester)

  const timetable = {
    autumn: semester?.find(({ season }) => season === 'autumn').timetable,
    spring: semester?.find(({ season }) => season === 'spring').timetable,
  }

  const reviewCount = reviews?.length
  const resourceCount = resources?.length

  let semTabInitialValue = latestSemester?.season
  if (!timetable.spring.length && !timetable.autumn.length) {
    semTabInitialValue = null
  } else if (!timetable.autumn.length) {
    semTabInitialValue = 'spring'
  }

  return (
    <>
      {semTabInitialValue ? (
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
      ) : (
        <Title style={{ margin: 0, opacity: 0.8 }}>
          Timetable entry not found
        </Title>
      )}

      {(isMobileS || !isMobile) && <Divider margin="0.75rem 0" />}
      {isMobile && !isMobileS && (
        <Divider style={{ width: '1px' }} type="vertical" />
      )}

      <div>
        <FlexGap>
          <ButtonSquareLink
            to={`${coursePageUrl(code, title)}#reviews`}
            style={{ width: '100%', marginBottom: '0.75rem' }}
          >
            <ChatAlt size="18" style={{ marginRight: '0.5rem' }} />
            Reviews {reviewCount > 0 && `(${reviewCount})`}
          </ButtonSquareLink>

          <CourseContentRequestButtonIcon
            code={code}
            type="reviews"
            tooltip="Request reviews"
          />
        </FlexGap>

        <FlexGap>
          <ButtonSquareLink
            style={{ width: '100%' }}
            to={`${coursePageUrl(code, title)}#resources`}
          >
            <DocumentText size="18" style={{ marginRight: '0.5rem' }} />
            Resources {resourceCount > 0 && `(${resourceCount})`}
          </ButtonSquareLink>

          <CourseContentRequestButtonIcon
            code={code}
            type="resources"
            tooltip="Request resources"
          />
        </FlexGap>
      </div>
    </>
  )
}

export default CourseItemSub

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

const FlexGap = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`
