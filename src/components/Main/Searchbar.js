import styled from 'styled-components'
import { Search } from '@styled-icons/heroicons-outline'

const Container = styled.div`

`

const Searchbar = () => {
	return (
        <Container>
            <Search />
            <h1>Search</h1>
        </Container>
    )
}

export default Searchbar
