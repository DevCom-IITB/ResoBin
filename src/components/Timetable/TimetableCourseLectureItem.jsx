import { Tooltip } from 'antd'
import styled from 'styled-components/macro'

import { colorPicker } from 'styles'

const TimeTableLectureItem = ({ colorCode, title, gridCol, gridRow }) => {
  return (
    <GridItem row={gridRow} col={gridCol}>
      <Tooltip title={title}>
        <Item colorCode={colorCode}>
          <h3>{title}</h3>

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
  background: white;
`

const Item = styled.div`
  height: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background: ${({ colorCode }) => colorPicker(colorCode)};
  cursor: pointer;
  transition: all 200ms ease-out;

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
