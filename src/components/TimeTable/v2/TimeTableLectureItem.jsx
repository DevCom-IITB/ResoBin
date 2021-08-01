import styled, { css } from 'styled-components/macro'

import { HEX2RGBA } from 'helpers'

const TimeTableLectureItem = ({ title, track, row }) => {
  const style = {
    gridColumn: `track-${track.id}-start`,
    gridRow: `time-${row.start.id} / time-${row.end.id}`,
  }

  return (
    <Container id={track.id} style={style}>
      <h3>{title}</h3>
      <span>
        {row.start.title} - {row.end.title}
      </span>
    </Container>
  )
}

export default TimeTableLectureItem

const colors = (num) => {
  switch (num) {
    case '1':
      return 'linear-gradient(to right, #00b09b, #96c93d)'
    case '2':
      return 'linear-gradient(to right, #000428, #004e92)'
    case '3':
      return 'linear-gradient(to right, #cb356b, #bd3f32)'
    case '4':
      return 'linear-gradient(to right, #f2994a, #f2c94c)'
    case '5':
      return 'linear-gradient(to right, #36d1dc, #5b86e5)'
    case '6':
      return 'linear-gradient(to right, #834d9b, #d04ed6)'
    case '7':
      return 'linear-gradient(to right, #fffc00, #fffc00)'
    default:
      return 'linear-gradient(to right, #666666, #aaaaaa)'
  }
}

const Container = styled.div`
  padding: 0.25rem;
  margin: 0;
  border-radius: 8px;
  font-size: 14px;
  color: #ffffff;
  background: ${({ id }) => colors(id)};

  & > h3 {
    margin: 0;
    font-size: 1rem;
  }

  & > span {
    display: block;
  }
`

const Container2 = styled.div`
  padding: 1rem;
  margin-bottom: 1.25rem;
  border: 1px solid hsl(0, 0%, 20%);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-family: system-ui, sans-serif;
  color: hsl(0, 0%, 50%);
  background: ${({ theme }) => HEX2RGBA(theme.darksecondary, 80)};
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    background: ${({ theme }) => HEX2RGBA(theme.darksecondary, 90)};
    transform: scale(1.005);
  }

  & > h4 {
    margin-right: 3rem;
    font-size: 0.875rem;
    color: #ffffff;
  }
`

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.625rem;

  & > picture {
    display: inline-block;
    overflow: hidden;
    margin-right: 0.625rem;
    border: 1px solid hsl(0, 0%, 20%);
    border-radius: 50%;
    block-size: 1.625rem;
    inline-size: 1.625rem;

    & > img {
      object-fit: cover;
      block-size: 100%;
      inline-size: 100%;
    }
  }
`
