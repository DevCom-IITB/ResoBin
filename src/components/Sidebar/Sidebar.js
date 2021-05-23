import React from 'react'
import styled from 'styled-components'
import Profile from './Profile'

// 1 rem = 20 px
const Container = styled.div`
	background: ${({ theme }) => theme.secondary};
	position: fixed;
	left: 0px;
	top: 0px;
	bottom: 0px;
	width: 10rem;
	
	padding: 20px 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Sidebar = () => {
	return (
		<Container>
			<Profile/>
			{/* <h1>Sidebar</h1> */}
		</Container>
	)
}

export default Sidebar
