import styled from 'styled-components'
import Courses from './Courses'
import Filters from './Filters'

const Container = styled.div`
	/* background: blue; */
	margin: 4rem 0 0 11.5rem;
	padding: 0 1rem;
	height: 1000px;
	display: flex;
`

const Main = () => {
	return (
		<Container>
			<Courses />
			<Filters />
		</Container>
	)
}

export default Main
