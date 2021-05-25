import styled from 'styled-components'
import Courses from '@app/components/main/courses/Courses'
import Filters from '@app/components/main/filters/Filters'

const Container = styled.div`
	margin: 4rem 0 0 11.5rem;
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
