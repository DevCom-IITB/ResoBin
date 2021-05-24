import React from 'react'
import styled from 'styled-components'
import ResoBinLogo from './ResoBinLogo'

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 4rem;
	left: 0px;
	top: 0px;
	background: #1b1728;
	/* background: ${({ theme }) => theme.secondary}; */
`

const LogoContainer = styled.div`
	width: 12.5rem;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Navbar = () => {
    return (
        <Container>
			<LogoContainer>
	            <ResoBinLogo />
			</LogoContainer>
        </Container>
    )
}

export default Navbar
