import styled from 'styled-components'
import ResoBinLogo from '@app/components/navbar/ResoBinLogo'
import DarkModeCheckbox from '@app/components/navbar/DarkModeCheckbox'
import CurrentTerm from '@app/components/navbar/CurrentTerm'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	position: fixed;
	width: 100%;
	height: 4rem;
	left: 0px;
	top: 0px;
	background: ${({ theme }) => theme.darksecondary};
`

const LogoContainer = styled.div`
	min-width: 11.5rem;
	min-height: 100%;
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
			<CurrentTerm text="AY 2021-22 | SPRING" />
			<DarkModeCheckbox />
		</Container>
	)
}

export default Navbar
