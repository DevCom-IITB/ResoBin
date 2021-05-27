import styled from 'styled-components'
import Sidebar from '@app/components/sidebar'
import Navbar from '@app/components/navbar'
import { Courses } from '@app/pages'

const Container = styled.div`
	/* display: flex; */
`

const Dashboard = () => {
	return (
    <Container>
      <Navbar />
      <Sidebar />
      <Courses />
    </Container>
  )
}

export default Dashboard
