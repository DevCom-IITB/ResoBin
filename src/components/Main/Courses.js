import styled from 'styled-components'
import Searchbar from './Searchbar'

const Title = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	letter-spacing: 0.4px;
	color: #252733;
`

// const Container = styled.div`
// 	/* margin: 0 auto; */
// 	/* max-width: 1000px; */
// 	/* display: grid; */

// 	/* background-color: #ffffff; */
// 	padding: 32px;

// 	border: 1px solid #dfe0eb;
// 	border-radius: 8px;
// 	box-sizing: border-box;
// 	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
// `

const Container = styled.div`
	/* background-color: pink; */
	margin-right: 1rem;
	width: calc(100% - 20vw);
	border-radius: 8px;
`

const CourseList = styled.div`
	background-color: #1b1728;
	margin: 1rem 0;
	height: 100%;
	border-radius: 8px;
	/* opacity: 100%; */
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
