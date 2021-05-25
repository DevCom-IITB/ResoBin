import styled from 'styled-components'
// import { Search } from '@styled-icons/heroicons-outline'
import HEX2RGBA from '@app/helpers/HEX2RGBA'

const Container = styled.div`
	background: linear-gradient(
		0deg,
		${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
		${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
	);
	display: flex;
	align-items: center;
	height: 4rem;
	position: sticky;
	top: 4rem;
	padding: 0 2rem;
	z-index: 0;
	/* box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3); */
`

const SearchBox = styled.input`
	background: #fff;

	font-size: 1.5rem;
	/* font-family: 'Montserrat'; */
	font-family: Mulish;
	font-style: normal;
	font-weight: bold;
	letter-spacing: 1.5px;
	width: 100%;
	height: 2.5rem;
	border-radius: 1.5rem;
	border: solid #d2d5d9;
	padding: 0 2rem;
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.3);
`

const Searchbar = () => {
	return (
        <Container>
            <SearchBox />
            {/* <Search size="24px" />
            <h1>Search</h1> */}
        </Container>
    )
}

export default Searchbar
