import styled from 'styled-components'

const Container = styled.div`
	background: black;
	opacity: 60%;
	position: fixed;
	top: 4rem;
	right: 0px;
	width: 20vw;
	height: 100%
`

const Filters = () => {
	return (
		<Container>
			<h1>Filter</h1>
		</Container>
	)
}

export default Filters
