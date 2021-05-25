// Credits: https://codesandbox.io/s/6v7n1vr8yn
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	position: relative;
`

const CheckboxInput = styled.input`
	cursor: pointer;
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 42px;
	height: 26px;
	${(props) =>
		props.checked &&
		`  
    &:checked + ${CheckboxLabel} {
      background: #707AFF;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin-left: 21px;
        transition: 200ms;
      }
    }
  `}
`

const CheckboxLabel = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 42px;
	height: 26px;
	border-radius: 15px;
	background: #bebebe;
	cursor: pointer;
	&::after {
		content: '';
		display: block;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin: 3px;
		background: #ffffff;
		box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
		transition: 200ms;
	}
`

const Checkbox = ({ checked, onClick }) => {
	const [InsideChecked, setInsideChecked] = useState(true)
	return (
		<Container onChange={() => (onClick ? onClick() : setInsideChecked(!InsideChecked))}>
			<CheckboxInput id="checkbox" type="checkbox" checked={checked || InsideChecked} />
			<CheckboxLabel htmlFor="checkbox" />
		</Container>
	)
}

export default Checkbox
