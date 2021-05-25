import styled from 'styled-components'

const Courses = () => {
    return (
        <Wrapper>
            <Title>Courses</Title>
        </Wrapper>
    )
}

const Title = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	letter-spacing: 0.4px;
	color: #252733;
`

const Wrapper = styled.div`
	/* margin: 0 auto; */
	/* max-width: 1000px; */
    display: grid;
    
	background-color: #ffffff;
	padding: 32px;

	border: 1px solid #dfe0eb;
	border-radius: 8px;
	box-sizing: border-box;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
`

export default Courses
