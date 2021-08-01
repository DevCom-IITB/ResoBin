import styled from 'styled-components/macro'

const TimeTableTimeSlot = ({ children, time }) => {
  return (
    <Container>
      <p>{time}</p>
      {children}
    </Container>
  )
}

export default TimeTableTimeSlot

const Container = styled.div`
  color: hsl(0, 0%, 50%);

  & > p {
    margin-bottom: 1rem;
  }
`
