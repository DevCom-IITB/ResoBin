import styled from 'styled-components'
import { Search } from '@styled-icons/heroicons-outline'

const Container = styled.div`
	display: flex;
	width: 100%;
	height: calc(3.5rem - 2px);
	
    position: sticky;
    top: 4rem;
    background: transparent;
`

const SearchBox = styled.input`
	font-size: 1.5rem;
	font-family: 'Montserrat';
	background: #fff;
	width: 100%;
	border-radius: 8px;
	border: solid #707aff;
	box-sizing: border-box;
	padding: 20px;
	box-shadow: 0px 10px 18px 2px rgba(0, 0, 0, 0.58);
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
