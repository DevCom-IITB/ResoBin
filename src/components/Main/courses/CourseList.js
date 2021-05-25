import styled from 'styled-components'

const Container = styled.div`
	background-color: #1b1728;
	margin: 1rem 0;
	height: 1000px;
	border-radius: 8px;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 1.25);
`

const Title = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	letter-spacing: 0.4px;
	color: #252733;
`

const CourseList = () => {
    return (
        <Container>
            <Title>Courses</Title>
        </Container>
    )
}

export default CourseList
