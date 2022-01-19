import { ExternalLink } from '@styled-icons/heroicons-outline'
import { Tooltip } from 'antd'
import { darken } from 'polished'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'
import { cols, rows, slots } from 'data/timetable'
import { hash, coursePageUrl } from 'helpers'
import { useColorPicker } from 'hooks'
import { selectCourseTitle } from 'store/courseSlice'
import { makeGradient } from 'styles'
import { fontSize } from 'styles/responsive'

// * id refers to the color of the timetable item
const TimetableCourseItem = ({ data }) => {
  const { id, course: code, lectureSlots, tutorialSlots } = data

  const title = useSelector(selectCourseTitle(code))
  const colorPicker = useColorPicker()

  const TimetableCourseLectureItem = useCallback(
    ({ gridCol, gridRow, slotName, isTutorial }) => (
      <GridItem row={gridRow} col={gridCol}>
        <Tooltip title={title}>
          <Item color={colorPicker(hash(id))}>
            <h3 style={{ paddingRight: '1rem' }}>
              {code} {isTutorial && ' | Tut'}
              <Link to={coursePageUrl(code, title)}>
                <ButtonIcon
                  size="small"
                  onClick={() => {}}
                  icon={<ExternalLink size="16" />}
                  color="#000000"
                  style={{
                    position: 'absolute',
                    top: '0.25rem',
                    right: '0.25rem',
                  }}
                />
              </Link>
            </h3>
            <span>
              {gridRow.start.title} - {gridRow.end.title} | {slotName}
            </span>
          </Item>
        </Tooltip>
      </GridItem>
    ),
    [code, id, title, colorPicker]
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

  & > h3 {
    font-size: ${fontSize.responsive.sm};
  }

  & > span {
    display: block;
    font-size: ${fontSize.responsive.xs};
  }

  &:hover {
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 40%);
  }
`
