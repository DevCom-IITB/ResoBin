import styled from 'styled-components/macro'

import { HEX2RGBA } from 'helpers'

const TimeTableLectureItem = ({ title, subtitle, img }) => {
  return (
    <Container>
      <h4>{title}</h4>
      <AuthorWrapper>
        <picture>
          <img src={img} alt="" />
        </picture>
        <figcaption>{subtitle}</figcaption>
      </AuthorWrapper>
    </Container>
  )
}

export default TimeTableLectureItem

const Container = styled.div`
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

const backgroundColor = (theme) => styled`
  .green {
    background: linear-gradient(to right, #00b09b, #96c93d)
  }
  .orange {
    background: linear-gradient(to right, #f2994a, #f2c94c)
  }
  .red {
    background: linear-gradient(to right, #cb356b, #bd3f32)
  }
  .yellow {
    background: linear-gradient(to right, #fffc00, #fffc00)
  }
  .blue {
    background: linear-gradient(to right, #36d1dc, #5b86e5)
  }
  .pink {
    background: linear-gradient(to right, #834d9b, #d04ed6)
  }
  .black {
    background: linear-gradient(to right, #000428, #004e92)
  }
`
