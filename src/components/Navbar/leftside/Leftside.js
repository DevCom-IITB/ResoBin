import styled from 'styled-components'
import DarkModeCheckbox from '@app/components/navbar/leftside/DarkModeCheckbox'

const Container = styled.div`
	/* background-color: white; */
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	/* width: 100%; */
	height: 100%;
	right: 0px;
	padding-right: 1rem;
`

const CurrentTerm = styled.h4`
	font-weight: 600;
	opacity: 70%;
	width: 100%;
	font-size: 1.25rem;
	line-height: 80%;
	background: blue;
	white-space: nowrap;
`

const LeftGroup = () => {
    return (
        <Container>
            {/* <CurrentTerm>AY 2021-22 | Spring</CurrentTerm> */}
			<DarkModeCheckbox />
        </Container>
    )
}

export default LeftGroup
