import { Tooltip } from 'antd'
import { darken } from 'polished'
import styled, { css } from 'styled-components/macro'

import { colorPicker, makeGradient } from 'styles/utils'

const TimeTableLectureItem = ({ colorCode, courseData, gridCol, gridRow }) => {
  return (
    <GridItem row={gridRow} col={gridCol}>
      <Tooltip title={courseData && courseData.Title}>
        <Item id={colorCode}>
          <h3>{courseData && courseData.Code}</h3>
          <span>
            {gridRow.start.title} - {gridRow.end.title}
          </span>
        </Item>
      </Tooltip>
    </GridItem>
  )
}

export default TimeTableLectureItem

const GridItem = styled.div`
  grid-row: ${({ row }) => row.start.id} / ${({ row }) => row.end.id};
  grid-column: ${({ col }) => col.id};
  color: ${({ theme }) => theme.textColor};
`

const getTile = (color) => css`
  border-left: 4px solid ${darken(0.2, color)};
  color: ${darken(0.7, color)};
  background: ${makeGradient(color)};
`

const Item = styled.div`
  height: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 200ms ease-out;

  ${({ id }) => getTile(colorPicker(id))}

  & > h3 {
    font-size: 1rem;
  }

  & > span {
    display: block;
    font-size: 0.75rem;
  }

  &:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  }
`
