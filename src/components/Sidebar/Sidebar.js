import React from 'react'
import styled from 'styled-components'
import SidebarItem from '@components/Sidebar/SidebarItem'
import ProfileImage from '@images/ProfileImg.jpg'
import ProfileImg from '@components/Sidebar/ProfileImg'

// 1 rem = 20 px
const Container = styled.div`
	background: ${({ theme }) => theme.secondary};
	position: fixed;
	left: 0px;
	top: 0px;
	bottom: 0px;
	width: 12.5rem; /* 200 px */

	padding: 20px 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
`	

const Divider = styled.div`
	background: white;
	opacity: 0.08;
	width: 100%;
	height: 1px;
	margin: 1.25rem 0px;
`

const Sidebar = () => {
	return (
		<Container>
			<SidebarItem title="Courses" active />
			<SidebarItem title="Contribute" />
			<SidebarItem title="Stats" />
			<Divider />
			<SidebarItem title="Laxman Desai" icon={<ProfileImg src={ProfileImage} />} />
			<SidebarItem title="Account" />
			<SidebarItem title="Favorites" />
			<SidebarItem title="Sign out" />
		</Container>
	)
}

export default Sidebar
