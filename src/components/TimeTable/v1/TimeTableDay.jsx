import styled from 'styled-components/macro'

const TimeTableDay = ({ children, title }) => {
  return (
    <DayContainer>
      <DayTitle>
        <h3>{title}</h3>
      </DayTitle>
      <Timings>{children}</Timings>
    </DayContainer>
  )
}

export default TimeTableDay

const DayContainer = styled.section`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  grid-gap: 2rem;
  min-width: 100vw;
  padding-top: 2rem;
  padding-bottom: 5rem;

  &::after {
    content: '';
    width: 4rem;
  }

  &:nth-child(1) > .schedule-stage__title > h3 {
    background: red;
    background: linear-gradient(to right, #eb3349, #f45c43);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:nth-child(3) > .schedule-stage__title > h3 {
    background: red;
    background: linear-gradient(to right, #1d976c, #93f9b9);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const DayTitle = styled.div`
  position: sticky;
  left: 0;
  height: 100%;
  padding-right: 5rem;
  padding-left: 4rem;
  background: linear-gradient(to right, #000000 30%, hsla(0, 0%, 0%, 0));

  & > h3 {
    font-weight: 900;
  }
`

const Timings = styled.div`
  display: grid;
  grid-auto-columns: 280px;
  grid-auto-flow: column;
  grid-gap: 2rem;
`
