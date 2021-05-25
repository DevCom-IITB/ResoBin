import styled from 'styled-components'
import Checkbox from '@app/components/common/Checkbox'

const CheckboxContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 1rem;
	height: 100%;
`

const Title = styled.h4`
	font-weight: 300;
	font-size: 0.8rem;
	line-height: 80%;
	padding-top: 0.5rem;
	color: ${({ theme }) => theme.textColor};
	opacity: 80%;
	white-space: nowrap;
`

const DarkModeCheckbox = () => {
	return (
		<CheckboxContainer>
			<Checkbox />
			<Title>Dark mode</Title>
		</CheckboxContainer>
	)
}

export default DarkModeCheckbox
