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
	cursor: pointer;
	&:hover {
		text-decoration: underline;
		background-color: rgba(0, 0, 0, 0.1);
		/* box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
		transform: scale(1.02) */
	}
`

const Title = styled.h4`
	font-weight: 400;
	color: ${(props) => (props.active ? props.theme.textColor : '#AAA5A5')};

	min-height: 100%;
	width: 70%;

	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	display: flex;
	align-items: center;
`

const IconContainer = styled.div`
	width: 30%; /* width: 60px */
	min-height: 100%;

	display: flex;
	align-items: center;
`

const SidebarItem = ({ title, icon, active }) => {
	return (
		<Container active={active}>
			<IconContainer className="iconify" data-inline="false" data-icon={`mdi-light:${icon}`}>
				{icon}
			</IconContainer>
			<Title active={active}>{title}</Title>
		</Container>
	)
}

export default SidebarItem
