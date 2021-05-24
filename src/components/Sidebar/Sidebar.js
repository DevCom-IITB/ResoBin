import React from 'react'
import styled from 'styled-components'
import SidebarItem from '@components/Sidebar/SidebarItem'
import ProfileImage from '@images/ProfileImg.jpg'
import ProfileImg from '@components/Sidebar/ProfileImg'
import ProfileImgItem from '@components/Sidebar/ProfileImgItem'

// 1 rem = 20 px
const Container = styled.div`
	background: ${({ theme }) => theme.secondary};
	left: 0rem;
	top: 0rem;
	bottom: 0rem;
	width: 12.5rem; /* width: 200 px */
	position: fixed;
	margin-top: 4rem;
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
			<SidebarItem noAnim title="Courses" active />
			<SidebarItem title="Contribute" />
			<SidebarItem title="Stats" />
			<Divider />
			<ProfileImgItem title="Laxman Desai" icon={<ProfileImg src={ProfileImage} />} />
			{/* <SidebarItem noAnim title="Laxman Desai" icon={<ProfileImg src={ProfileImage} />} /> */}
			<SidebarItem title="Account" />
			<SidebarItem title="Favorites" />
			<SidebarItem title="Sign out" />
		</Container>
	)
}

export default Sidebar
