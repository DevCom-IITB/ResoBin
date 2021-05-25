import styled from 'styled-components'
import CourseList from '@app/components/main/courses/CourseList'
import Searchbar from '@app/components/main/courses/Searchbar'
import PageNo from '@app/components/main/courses/PageNo'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 19rem;
`


const Courses = () => {
	return (
		<Container>
			<Searchbar />
			<CourseList />
			<PageNo />
		</Container>
	)
}

export default Courses
