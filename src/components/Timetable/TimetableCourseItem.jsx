import { ExternalLink } from '@styled-icons/heroicons-outline'
import { Tooltip } from 'antd'
import { darken } from 'polished'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'
import { cols, rows, slots } from 'data/timetable'
import { hash, coursePageUrl } from 'helpers'
import { useColorPicker } from 'hooks'
import { selectCourseTitle } from 'store/courseSlice'
import { makeGradient } from 'styles'
import { fontSize } from 'styles/responsive'

const TimetableCourseItem = ({ data }) => {
  const { id, course: code, lectureSlots, tutorialSlots, lectureVenue } = data

  const title = useSelector(selectCourseTitle(code))
  const colorPicker = useColorPicker()

  const handleClickInfo = useCallback(() => {
    window.location.href = coursePageUrl(code, title)
  }, [code, title])

  const formatItem = (name, isTut, venue) => {
    if (venue === '' || isTut === true) {
      return `${name}`
    }
    return `${name} | ${venue}`
  }

  const TimetableCourseLectureItem = useCallback(
    ({ gridCol, gridRow, slotName, isTutorial, venue }) => (
      <GridItem row={gridRow} col={gridCol}>
        <Tooltip title={title}>
          <Item color={colorPicker(hash(id))}>
            <div className="item-content">
              <div>
                <h3 style={{ paddingRight: '1rem' }}>
                  {code} {isTutorial && ' | Tut'}
                  <ButtonIcon
                    size="small"
                    onClick={handleClickInfo}
                    icon={<ExternalLink size="16" />}
                    color="#000000"
                    style={{
                      position: 'absolute',
                      top: '0.25rem',
                      right: '0.25rem',
                    }}
                  />
                </h3>
                <span>
                  {formatItem(gridRow.start.title, isTutorial, lectureVenue)}
                </span>
              </div>
              <span className="slot-name">
                <h3>{slotName}</h3>
              </span>
            </div>
          </Item>
        </Tooltip>
      </GridItem>
    ),
    [code, id, title, colorPicker, handleClickInfo, lectureVenue]
  )

  if (lectureSlots?.length === 0) return null

  const courseSlots = lectureSlots
    .map((slot) => ({ slot, grid: slots[slot], isTutorial: false }))
    .concat(
      tutorialSlots.map((slot) => ({
        slot,
        grid: slots[slot],
        isTutorial: true,
      }))
    )

  return courseSlots?.map(({ slot, grid, isTutorial }, idx) => (
    <TimetableCourseLectureItem
      key={String(idx) + String(slot)}
      gridCol={cols[grid.col - 1]}
      gridRow={{ start: rows[grid.row.start], end: rows[grid.row.end] }}
      slotName={slot}
      isTutorial={isTutorial}
      lectureVenue={lectureVenue}
    />
  ))
}

export default TimetableCourseItem

const GridItem = styled.div`
  grid-row: ${({ row }) => row.start.id} / ${({ row }) => row.end.id};
  grid-column: ${({ col }) => col.id};
  position: relative;

  &:hover {
    text-decoration: none;
  }
`

const getTile = (color) => css`
  color: ${({ theme }) => theme.darksecondary};
  background: ${makeGradient(color)};
  border-left: 4px solid ${darken(0.2, color)};
`

const Item = styled.div`
  height: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: all 200ms ease-out;
  ${({ color }) => getTile(color)}

  .item-content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }

  & > .item-content > div {
    display: flex;
    flex-direction: column;
  }

  & > .item-content > .slot-name {
    position: absolute;
    right: 0.5rem;
    bottom: 0.25rem;
    font-size: ${fontSize.responsive.xs};
    color: ${({ theme }) => theme.darksecondary};
    white-space: nowrap;
    margin-left: 0;
  }

  & > .item-content h3 {
    font-size: ${fontSize.responsive.sm};
  }

  & > .item-content span {
    display: block;
    font-size: ${fontSize.responsive.xs};
  }

  &:hover {
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 40%);
  }
`
