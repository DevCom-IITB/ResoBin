import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	position: relative;
`

const CheckboxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    margin: 5px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
    transition: 200ms;
  }
`

const CheckboxInput = styled.input`
	cursor: pointer;
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 42px;
	height: 26px;

	&:checked + ${CheckboxLabel} {
		background: #707AFF;
		
		&::after {
			content: "";
			display: block;
			border-radius: 50%;
			width: 1rem;
			height: 1rem;
			margin-left: 21px;
			transition: 200ms;
		}
	}
`

const Checkbox = ({ onClick }) => {
	return (
    <Container>
      <CheckboxInput
        id="checkbox"
        type="checkbox"
        defaultChecked="true"
        onClick={onClick}
      />
      <CheckboxLabel htmlFor="checkbox" />
    </Container>
  )
}

export default Checkbox
