import styled from 'styled-components'
import Sidebar from '@app/components/sidebar'
import Navbar from '@app/components/navbar'

const Container = styled.div`
	/* display: flex; */
`

const Dashboard = () => {
	return (
    <Container>
      <Navbar />
      <Sidebar />
    </Container>
  )
}

export default Dashboard
