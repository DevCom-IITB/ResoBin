import React from 'react'
import styled from 'styled-components'
import Sidebar from '@components/Sidebar/Sidebar'
import Main from '@components/Main/Main'
import Navbar from '@components/Navbar/Navbar'

const Container = styled.div`
	display: block;
`

const Dashboard = () => {
	return (
		<Container>
			<Navbar />
			<Sidebar />
			<Main />
		</Container>
	)
}

export default Dashboard
