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
              <div className="details-row">
                <h3 style={{ paddingRight: '1rem' }}>
                  {code} | {slotName}
                  <ButtonIcon
                    size="small"
                    onClick={handleClickInfo}
                    icon={<ExternalLink size="16" />}
                    color="#000000"
                    style={{
                      position: 'absolute',
                      bottom: '2.5rem',
                      left: '7.3rem',
                    }}
                  />
                </h3>
                <div className="info-row">
                  <span>
                    {formatItem(gridRow.start.title, isTutorial, lectureVenue)}
                  </span>
                  {isTutorial && (
                    <span className="tutorial-label">(Tutorial)</span>
                  )}
                </div>
              </div>
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

  .item-content > .details-row > .info-row {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .item-content > .details-row > .info-row > .tutorial-label {
    margin-left: auto;
    font-size: ${fontSize.responsive.xs};
    font-weight: 500;
    white-space: nowrap;
    align-self: flex-end;
  }

  .item-content > .details-row > .info-row > .slot-name {
    margin-left: auto;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    font-size: ${fontSize.responsive.sm};
    font-weight: bold;
    color: ${({ theme }) => theme.darksecondary};
    white-space: nowrap;
    display: flex;
    align-items: center;
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
