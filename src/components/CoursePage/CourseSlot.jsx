import styled from 'styled-components/macro'

const CourseSlot = ({ semester }) => {
  const slot = semester.find((s) => s.timetable.length !== 0)

  if (!slot) {
    return <Title style={{ opacity: 0.8 }}>Slots not found</Title>
  }

  const [Slots] = slot.timetable

  const SlotItems = []

  if (Slots.lectureSlots.length !== 0) {
    SlotItems.push({
      title: 'Lecture Slots',
      value: Slots.lectureSlots.join(', '),
    })
  }

  if (Slots.tutorialSlots.length !== 0) {
    SlotItems.push({
      title: 'Tutorial Slots',
      value: Slots.tutorialSlots.join(', '),
    })
  }

  if (SlotItems.length === 0) {
    return null
  }

  return (
    <CourseSlotContainer>
      <Title>Slots:</Title>
      <SlotContainer>
        {SlotItems.map(({ title, value }) => (
          <span key={title}>
            {title}: <b>{value}</b>
          </span>
        ))}
      </SlotContainer>
    </CourseSlotContainer>
  )
}

export default CourseSlot

const CourseSlotContainer = styled.div`
  color: ${({ theme }) => theme.textColor};

  h3 {
    font-weight: 400;
    margin-bottom: 0.25rem;
  }
`

const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: ${({ theme }) => theme.darksecondary};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`

const Title = styled.h3`
  margin: 0 0.25rem 0.25rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
`
