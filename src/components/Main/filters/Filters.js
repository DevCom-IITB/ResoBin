import styled from 'styled-components'

const Container = styled.div`
	background: ${({ theme }) => theme.secondary};
	position: fixed;
	top: 4rem;
	right: 0px;
	width: 19rem;
	height: 100%;
	padding: 2rem;
	z-index: 9; /* To put searchbar at the bottom */
`

const Filters = () => {
	return (
		<Container>
			<h1>Filter</h1>
		</Container>
	)
}

export default Filters
