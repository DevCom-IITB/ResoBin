import React from 'react'
import styled from 'styled-components'
import SidebarItem from '@components/Sidebar/SidebarItem'

import ProfileImage from '@images/ProfileImg.jpg'
import ProfileImgItem from '@components/Sidebar/ProfileImgItem'

import { BookOpen, Bookmark, ChartPie, CloudUpload, Cog, Logout } from '@styled-icons/heroicons-outline'

// 1 rem = 20 px
const Container = styled.div`
	background: ${({ theme }) => theme.secondary};
	left: 0rem;
	top: 0rem;
	bottom: 0rem;
	width: 11.5rem; /* width: 184 px */
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
			<SidebarItem title="Courses" icon={<BookOpen size="20" />} active />
			<SidebarItem title="Contribute" icon={<CloudUpload size="20" />} />
			<SidebarItem title="Stats" icon={<ChartPie size="20" />} />
			<Divider />
			<ProfileImgItem title="Laxman Desai" src={ProfileImage} />
			{/* <SidebarItem title="Laxman Desai" icon={<ProfileImg src={ProfileImage} />} /> */}
			<SidebarItem title="Account" icon={<Cog size="20" />} />
			<SidebarItem title="Favorites" icon={<Bookmark size="20" title="Check course material" />} />
			<SidebarItem title="Sign out" icon={<Logout size="20" />} />
		</Container>
	)
}

export default Sidebar
