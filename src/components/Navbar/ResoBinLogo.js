import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	&:hover {
		transform: scale(1.03);
		transition-duration: 300ms;
	}
`

const Text = styled.div`
	font-family: Montserrat;
	font-style: normal;
	font-weight: 600;
	font-size: 36px;
	line-height: 110%;
	color: #707aff;
`

const Underline = styled.div`
	width: 148px;
	height: 4.5px;
	margin-bottom: 7px;
	background: #707aff;
`

const ResoBinLogo = () => {
    return (
        <Container>
            <Text>ResoBin</Text>
            <Underline/>
        </Container>
    )
}

export default ResoBinLogo
