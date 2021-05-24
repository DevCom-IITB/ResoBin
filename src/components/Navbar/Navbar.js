import React from 'react'
import styled from 'styled-components'

const Navbar = () => {
    return (
        <Container>
            <h1>Navbar</h1>
        </Container>
    )
}

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 80px;
	left: 0px;
	top: 0px;
	background: #252733;
`

export default Navbar
