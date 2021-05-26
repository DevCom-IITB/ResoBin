import styled from 'styled-components'
import Sidebar from '@app/components/sidebar/Sidebar'
import Main from '@app/components/main/Main'
import Navbar from '@app/components/navbar/Navbar'

const Container = styled.div`
	/* display: flex; */
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
