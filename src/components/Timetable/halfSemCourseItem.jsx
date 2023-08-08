
import { id } from 'date-fns/locale'
import { darken } from 'polished'
import { useCallback } from 'react'
import styled, { css } from 'styled-components/macro'

import { cols, rows, slots } from 'data/timetable'
import { hash} from 'helpers'
import { useColorPicker } from 'hooks'
import { makeGradient } from 'styles'
import { fontSize } from 'styles/responsive'



const HalfSemCourseItem = ({data , keyProp}) => {

      
    const colorPicker = useColorPicker()
    const TimetableCourseLectureItem = useCallback(
        ({ gridCol, gridRow, slotName, isTutorial, venue }) => (
          <GridItem row={gridRow} col={gridCol}>
              <Item color={colorPicker(hash(id))}>
              <h3 style={{ paddingRight: '1rem' }}>
              {data[0]}
              {data[1] && ` | ${data[1]}`}
              </h3>
              </Item>
          </GridItem>
        ),
        [data, id, colorPicker]
      )

      const courseSlots = [
        {
          slot: keyProp,
          grid: slots[keyProp],
          isTutorial: true,
        },
      ];

      return courseSlots?.map(({ slot, grid, isTutorial }, idx) => (
        <TimetableCourseLectureItem
          key={String(idx) + String(slot)}
          gridCol={cols[grid.col - 1]}
          gridRow={{ start: rows[grid.row.start], end: rows[grid.row.end] }}
          slotName={slot}
          isTutorial={isTutorial}
        //   lectureVenue={lectureVenue}
        />
      ))
   

}

export default HalfSemCourseItem

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