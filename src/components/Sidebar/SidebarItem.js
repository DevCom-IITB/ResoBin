import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	min-height: 3.5rem;
	width: 100%;
	padding: 0px 0.75rem;

	display: flex;
	flex-direction: row;

	border-left: 3px solid ${(props) => (props.active ? props.theme.activeMenu : 'transparent')};
	background-color: ${(props) => (props.active ? props.theme.headerNumber : props.theme.secondary)};
`

const Title = styled.h4`
	font-weight: 300;
	color: ${({ theme }) => theme.textColor};

	min-height: 100%;
	width: 70%;

	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	display: flex;
	align-items: center;
`

const IconContainer = styled.div`
	width: 30%; /* 60px */
	min-height: 100%;

	display: flex;
	align-items: center;
`

const SidebarItem = ({ title, icon, active }) => {
	return (
		<Container active={active}>
			<IconContainer>{icon}</IconContainer>
			<Title>{title}</Title>
		</Container>
	)
}

export default SidebarItem
