import styled from 'styled-components'
// import { Search } from '@styled-icons/heroicons-outline'
import HEX2RGBA from '@app/helpers/HEX2RGBA'

const Container = styled.div`
	background: linear-gradient(
		0deg,
		${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
		${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
		${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
	);
	display: flex;
	align-items: center;
	height: 4rem;
	position: sticky;
	top: 4rem;
	padding: 0 2rem;
	z-index: 0;
`

const SearchBox = styled.input`
  background: ${({ theme }) => theme.colorWhite};

  /* font-family: 'Montserrat'; */
  font-family: Mulish;
  font-size: 1.25rem;
  letter-spacing: 1.5px;

  width: 100%;
  height: 2.5rem;
  padding: 0 2rem;

  border-radius: 1.5rem;
  border: solid #ccc;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.searchColor};
  }

  &:focus {
    background: ${({ theme }) => theme.searchColor};
    outline: none;
    cursor: auto;
  }
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
