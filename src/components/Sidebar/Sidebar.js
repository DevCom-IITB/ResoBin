import React from 'react'
import styled from 'styled-components'
import Common from './Common/Common'
import Personal from './Personal/Personal'

// 1 rem = 20 px
const Container = styled.div`
	background: ${({ theme }) => theme.secondary};
	position: fixed;
	left: 0px;
	top: 0px;
	bottom: 0px;
	width: 12rem; /* 192px */
	
	padding: 20px 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Sidebar = () => {
	return (
		<Container>
			<Personal/>
			<Common />
		</Container>
	)
}

export default Sidebar
