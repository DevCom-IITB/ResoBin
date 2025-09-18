
import React from "react";
import { FaRegFile } from "react-icons/fa";
import { FiCalendar, FiBell, FiUpload } from "react-icons/fi";
import {useNavigate} from 'react-router-dom';
import styled from "styled-components/macro";

const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    { id: "add-event", icon: <FiCalendar />, title: "Add Event", subtitle: "sync it to your timetable", onClick: () => navigate(`/timetable/month`) },
    { id: "set-reminder", icon: <FiBell />, title: "Set Reminder", subtitle: "Stay on track", onClick: () => navigate(`/timetable/day`) },
    { id: "request-resource", icon: <FaRegFile />, title: "Request Resource", subtitle: "Ask for study material", onClick: () => navigate(`/courses`) },
    { id: "upload-resource", icon: <FiUpload />, title: "Upload Resource", subtitle: "Contribute study material", onClick: () => navigate(`/contribute`) },
  ];

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
    );
};

export default QuickActions;

// Styled Components
const Container = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const Heading = styled.h3`
  color: white;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  margin-bottom: 0.8rem;
`;

const ActionsGrid = styled.div`
  display: flex;
  gap: 2rem;
`;

const ActionCard = styled.div`
  background-color: transparent;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  padding: 1rem;
  width: 215.7px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #9b7bff;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const ActionTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: white;
`;

const ActionSubtitle = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;
