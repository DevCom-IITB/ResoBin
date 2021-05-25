import styled from 'styled-components'
import CourseList from '@app/components/main/courses/CourseList.jsx'
import Searchbar from '@app/components/main/courses/Searchbar.jsx'
import PageNo from '@app/components/main/courses/PageNo.jsx'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* background: pink; */
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
