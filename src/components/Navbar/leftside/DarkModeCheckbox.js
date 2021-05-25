import styled from 'styled-components'
import Checkbox from '@app/components/common/Checkbox'

const CheckboxContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	height: 100%;
	opacity: 90%;
`

const Title = styled.h4`
	font-weight: 300;
	font-size: 0.8rem;
	line-height: 80%;
	padding-top: 0.5rem;
	color: ${({ theme }) => theme.textColor};
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
