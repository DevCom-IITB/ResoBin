import styled from 'styled-components'
import CourseList from '@app/components/main/courses/CourseList'
import Searchbar from '@app/components/main/courses/Searchbar'

const Container = styled.div`
	background-color: pink;
	margin-right: 19rem;
	height: 100%;
	padding: 32px;
`


const Courses = () => {
	return (
		<Container>
			<Searchbar />
			<CourseList />
		</Container>
	)
}

export default Courses
