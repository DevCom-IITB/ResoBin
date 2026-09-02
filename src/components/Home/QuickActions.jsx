import React from 'react'
import { FaRegFile } from 'react-icons/fa'
import { FiCalendar, FiBell, FiUpload } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

const QuickActions = () => {
  const navigate = useNavigate()
  const actions = [
    {
      id: 'add-event',
      icon: <FiCalendar />,
      title: 'Add Event',
      subtitle: 'sync it to your timetable',
      onClick: () =>
        navigate('/timetable/month', { state: { autoOpen: 'personal' } }),
    },
    {
      id: 'set-reminder',
      icon: <FiBell />,
      title: 'Set Reminder',
      subtitle: 'Stay on track',
      onClick: () =>
        navigate('/timetable/day', { state: { autoOpen: 'reminder' } }),
    },
    {
      id: 'request-resource',
      icon: <FaRegFile />,
      title: 'Request Resource',
      subtitle: 'Ask for study material',
      onClick: () => navigate(`/courses`),
    },
    {
      id: 'upload-resource',
      icon: <FiUpload />,
      title: 'Upload Resource',
      subtitle: 'Contribute study material',
      onClick: () => navigate(`/contribute`),
    },
  ]

  return (
    <Container>
      <Heading>Quick Actions</Heading>
      <ActionsGrid>
        {actions.map((action) => (
          <ActionCard key={action.id} onClick={action.onClick}>
            <IconWrapper>{action.icon}</IconWrapper>
            <ActionTitle>{action.title}</ActionTitle>
            <ActionSubtitle>{action.subtitle}</ActionSubtitle>
          </ActionCard>
        ))}
      </ActionsGrid>
    </Container>
  )
}

export default QuickActions

const Container = styled.div`
  margin: 2rem 1rem 1rem 1rem;
`

const Heading = styled.h3`
  color: white;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  margin-bottom: 0.8rem;
`
const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;

  /* Large screens: 4 in a row */
  grid-template-columns: repeat(4, 1fr);

  /* Medium screens: 2 per row */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  /* Small screens: stack vertically */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const ActionCard = styled.div`
  background-color: transparent;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  padding: 1rem;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    border-color: #9b7bff;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 0.8rem;
  }
`

const IconWrapper = styled.div`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.5rem;
`

const ActionTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: white;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`

const ActionSubtitle = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`
