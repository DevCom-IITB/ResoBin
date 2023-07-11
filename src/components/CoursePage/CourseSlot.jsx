import styled from 'styled-components/macro'

import { device } from 'styles/responsive'

// ? repeat n times a Box component with color = color
const CourseSlotItem = ({ value, title }) =>
  value == null ? null : <BoxContainer>{`${title}:${value}`}</BoxContainer>

const CourseSlot = ({ semester }) => {
  let flag = false
  let Slots = null
  for (let i = 0; i < semester.length; i += 1) {
    if (semester[i].timetable.length !== 0) {
      ;[Slots] = semester[i].timetable
      flag = true
      break
    }
  }
  if (flag === false)
    return <Title style={{ opacity: 0.8 }}>Slots not found</Title>

  const SlotItems = [
    {
      title: 'Lecture Slots',
      value: Slots.lectureSlots.length === 0 ? null : Slots.lectureSlots,
    },
    {
      title: 'Tutorial Slots',
      value: Slots.tutorialSlots.length === 0 ? null : Slots.tutorialSlots,
    },
  ]

  return (
    <Container>
      <Title>Slots</Title>
      <SlotContainer>
        {SlotItems.map(({ title, value }) => (
          <CourseSlotItem key={title} title={title} value={value} />
        ))}
      </SlotContainer>
    </Container>
  )
}

export default CourseSlot

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.max.xs} {
    align-items: center;
  }
`

const SlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 10rem;
  padding: 4px;
  overflow: auto;
  background: ${({ theme }) => theme.darksecondary};
  border-radius: 10px;
`

const BoxContainer = styled.h5`
  margin: 0 0.25rem 0.25rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
`
const Title = styled.h3`
  margin: 0 0.25rem 0.25rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
`
