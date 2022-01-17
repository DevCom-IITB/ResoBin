import { Tooltip } from 'antd'
import { darken } from 'polished'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components/macro'

import { cols, rows, slots } from 'data/timetable'
import { selectCourseTitle } from 'store/courseSlice'
import { useColorPicker, makeGradient } from 'styles/utils'

// * id refers to the color of the timetable item
const TimetableCourseItem = ({ data, colorCode = 0 }) => {
  const { course: code, lectureSlots, tutorialSlots } = data
  const title = useSelector(selectCourseTitle(code))
  const colorPicker = useColorPicker()
  const displayIfTutorial = (isTutorial) => {
    if (isTutorial) return " | Tut"
    return null
  }
  const TimetableCourseLectureItem = useCallback(
    ({ gridCol, gridRow, slotName, isTutorial }) => (
      <GridItem row={gridRow} col={gridCol}>
        <Tooltip title={title}>
          <Item color={colorPicker(colorCode)}>
            <h3>{code} {displayIfTutorial(isTutorial)}</h3>
            <span>
              {gridRow.start.title} - {gridRow.end.title} | {slotName}
            </span>
          </Item>
        </Tooltip>
      </GridItem>
    ),
    [code, colorCode, title, colorPicker]
  )

  if (lectureSlots?.length === 0) return null
  const courseSlots = lectureSlots.map((slot) => ({slot, grid: slots[slot], isTutorial: false})).concat(
    tutorialSlots.map((slot) => ({slot, grid: slots[slot], isTutorial: true}))
  )
  return courseSlots?.map(({ slot, grid, isTutorial }, idx) => (
    <TimetableCourseLectureItem
      key={String(idx)}
      gridCol={cols[grid.col - 1]}
      gridRow={{ start: rows[grid.row.start], end: rows[grid.row.end] }}
      slotName={slot}
      isTutorial={isTutorial}
    />
  ))
}

export default TimetableCourseItem

const GridItem = styled.div`
  grid-row: ${({ row }) => row.start.id} / ${({ row }) => row.end.id};
  grid-column: ${({ col }) => col.id};
  color: ${({ theme }) => theme.textColor};
`

const getTile = (color) => css`
  color: ${darken(0.7, color)};
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

  & > h3 {
    font-size: 1rem;
  }

  & > span {
    display: block;
    font-size: 0.75rem;
  }

  &:hover {
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 40%);
  }
`
