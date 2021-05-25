import Divider from '@app/components/common/Divider'
import styled from 'styled-components'

const Container = styled.div`
	background-color: #1b1728;
	margin: 2rem;
	height: 1000px;
	border-radius: 8px;
	/* box-shadow: 0px 2px 6px rgba(0, 0, 0, 1.25); */
`

const Title = styled.h4`
	font-family: Mulish;
	font-style: normal;
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 30px;
	letter-spacing: 1.5px;
	padding: 2.5rem 2.5rem 1rem;
	color: #fff;
`

const CourseList = () => {
    return (
        <Container>
            <Title>Courses</Title>
			<Divider />
			{/* Hello World */}
        </Container>
    )
}

export default CourseList
